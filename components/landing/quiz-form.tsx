"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { questions, type QuizAnswers, type QuizResult } from "@/lib/quiz";

export function QuizForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[step];
  const isLastQuestion = step === questions.length - 1;
  const isEmailStep = step === questions.length;

  const handleRadioChange = (value: string) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: value,
    }));
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: checked
        ? [
            ...(((currentAnswers[currentQuestion.id] as string[] | undefined) ??
              []) as string[]),
            option,
          ]
        : (
            (currentAnswers[currentQuestion.id] as string[] | undefined) ?? []
          ).filter((item) => item !== option),
    }));
  };

  const canProceed = () => {
    if (isEmailStep) {
      return email.includes("@");
    }

    if (!currentQuestion) {
      return false;
    }

    const answer = answers[currentQuestion.id];

    if (currentQuestion.type === "checkbox") {
      return Array.isArray(answer) && answer.length > 0;
    }

    return Boolean(answer);
  };

  const handleNext = () => {
    if (isEmailStep) {
      void submitQuiz();
      return;
    }

    setStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    if (isSubmitting) {
      return;
    }

    if (step > 0) {
      setStep((currentStep) => currentStep - 1);
      setSubmitError(null);
    }
  };

  const submitQuiz = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          answers,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        result?: QuizResult;
      };

      if (!response.ok || !data.result) {
        throw new Error(
          data.error ?? "We could not send your results. Please try again.",
        );
      }

      setResult(data.result);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your results. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && result) {
    const dominantBreakdown = [...result.breakdown].sort(
      (left, right) => right.score - left.score,
    )[0];

    return (
      <section id="quiz" className="bg-card px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-border bg-background p-8 shadow-xl md:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <p className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Your quiz results are in
              </p>
              <h2 className="mb-4 font-serif text-3xl text-foreground md:text-4xl">
                {result.patternName}
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {result.summary}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="mb-5 font-serif text-2xl text-foreground">
                  Your pattern breakdown
                </h3>
                <div className="space-y-4">
                  {result.breakdown.map((item) => (
                    <div key={item.id}>
                      <div className="mb-2 flex items-center gap-3 text-sm">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="flex-1 text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="font-medium text-foreground">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="mb-5 font-serif text-2xl text-foreground">
                  What this means
                </h3>
                <div className="space-y-4">
                  {result.meaning.map((point) => (
                    <div key={point} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p className="text-sm leading-6 text-muted-foreground">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-card p-6">
              <h3 className="mb-4 font-serif text-2xl text-foreground">
                Your selected responses
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.selectedResponses.slice(0, 6).map((response) => (
                  <span
                    key={response}
                    className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm text-foreground"
                  >
                    {response}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-base text-muted-foreground">
                Check your inbox at{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Strongest signal:{" "}
                <span className="font-medium text-foreground">
                  {dominantBreakdown.label}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="bg-card px-4 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-primary font-medium">2-minute quiz</p>
          <h2 className="mb-4 text-balance font-serif text-3xl text-foreground md:text-4xl">
            Discover your eating pattern
          </h2>
          <p className="text-lg text-muted-foreground">
            Take the quiz and get your personalized results by email
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>
              Question {Math.min(step + 1, questions.length)} of {questions.length}
            </span>
            <span>{Math.round((step / questions.length) * 100)}% complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-8 shadow-xl md:p-10">
          {isEmailStep ? (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-foreground">
                Almost there! Where should we send your results?
              </h3>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                We&apos;ll email you a personalized result in the same style as
                the Steady preview card.
              </p>
              {submitError ? (
                <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {submitError}
                </p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-foreground">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === "radio" ? (
                <RadioGroup
                  value={(answers[currentQuestion.id] as string) || ""}
                  onValueChange={handleRadioChange}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all",
                        answers[currentQuestion.id] === option
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30",
                      )}
                    >
                      <RadioGroupItem value={option} />
                      <span className="text-foreground">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isChecked = (
                      (answers[currentQuestion.id] as string[] | undefined) ?? []
                    ).includes(option);

                    return (
                      <label
                        key={option}
                        className={cn(
                          "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all",
                          isChecked
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30",
                        )}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(option, checked as boolean)
                          }
                        />
                        <span className="text-foreground">{option}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between border-t border-border pt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0 || isSubmitting}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="gap-2 rounded-full px-6"
            >
              {isSubmitting ? <Spinner className="h-4 w-4" /> : null}
              {isEmailStep
                ? isSubmitting
                  ? "Sending your results"
                  : "Get my results"
                : isLastQuestion
                  ? "Continue to email"
                  : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
