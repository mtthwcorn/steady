import * as React from "react";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { Resend } from "resend";

import { QuizResultsEmail } from "@/emails/quiz-results-email";
import {
  calculateQuizResult,
  type QuizSubmission,
  quizSubmissionSchema,
} from "@/lib/quiz";

type StoredQuizSubmission = {
  submittedAt: string;
  email: string;
  answers: QuizSubmission["answers"];
  result: ReturnType<typeof calculateQuizResult>;
};

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const parsedSubmission = quizSubmissionSchema.safeParse(payload);

  if (!parsedSubmission.success) {
    return NextResponse.json(
      {
        error: "Please complete every quiz step and enter a valid email.",
      },
      { status: 400 },
    );
  }

  const submission = parsedSubmission.data;
  const result = calculateQuizResult(submission.answers);
  const storedSubmission: StoredQuizSubmission = {
    submittedAt: new Date().toISOString(),
    email: submission.email,
    answers: submission.answers,
    result,
  };

  try {
    await sendResultsEmail(storedSubmission);
  } catch (error) {
    console.error("Failed to send quiz results email", error);

    return NextResponse.json(
      { error: "We could not send your results email right now." },
      { status: 500 },
    );
  }

  try {
    await persistSubmission(storedSubmission);
  } catch (error) {
    console.error("Failed to persist quiz submission", error);
  }

  return NextResponse.json({
    ok: true,
    result,
  });
}

async function sendResultsEmail(submission: StoredQuizSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error(
      "Missing RESEND_API_KEY or RESEND_FROM_EMAIL environment variables.",
    );
  }

  const resend = new Resend(apiKey);
  const ctaUrl =
    process.env.QUIZ_RESULTS_CTA_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  const html = await render(
    React.createElement(QuizResultsEmail, {
      recipientEmail: submission.email,
      result: submission.result,
      ctaUrl,
    }),
  );

  const { error } = await resend.emails.send({
    from,
    to: submission.email,
    subject: `Your Steady result: ${submission.result.patternName}`,
    html,
    replyTo: process.env.RESEND_REPLY_TO,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function persistSubmission(submission: StoredQuizSubmission) {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: process.env.GOOGLE_APPS_SCRIPT_SECRET,
      ...submission,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(
      `Apps Script webhook responded with ${response.status}: ${responseText}`,
    );
  }
}
