"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: "eating-pattern",
    question: "Which eating pattern do you relate to most?",
    type: "radio",
    options: [
      "I eat impulsively without thinking",
      "I eat for emotional comfort",
      "I have strong sensory/texture preferences",
      "My eating schedule is chaotic",
      "I fixate on specific foods for periods"
    ]
  },
  {
    id: "challenges",
    question: "What are your biggest challenges? (Select all that apply)",
    type: "checkbox",
    options: [
      "Resisting impulse eating",
      "Meal planning and prep",
      "Maintaining consistency",
      "Emotional or stress eating",
      "Sensory issues with healthy foods",
      "Remembering to eat regular meals"
    ]
  },
  {
    id: "tried-before",
    question: "Have traditional weight loss programs worked for you?",
    type: "radio",
    options: [
      "I've tried many and they never stick",
      "They work briefly but I can't maintain them",
      "I've never found one that fits how my brain works",
      "I haven't tried many formal programs"
    ]
  },
  {
    id: "neurodivergence",
    question: "Do you identify with any of these?",
    type: "checkbox",
    options: [
      "ADHD (diagnosed or suspected)",
      "Autism (diagnosed or suspected)",
      "Executive function challenges",
      "Anxiety or depression",
      "Other neurodivergence",
      "None of these"
    ]
  }
];

export function QuizForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[step];
  const isLastQuestion = step === questions.length - 1;
  const isEmailStep = step === questions.length;

  const handleRadioChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const current = (answers[currentQuestion.id] as string[]) || [];
    if (checked) {
      setAnswers({ ...answers, [currentQuestion.id]: [...current, option] });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: current.filter(o => o !== option) });
    }
  };

  const canProceed = () => {
    if (isEmailStep) return email.includes("@");
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "checkbox") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (isEmailStep) {
      setSubmitted(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (submitted) {
    return (
      <section id="quiz" className="py-24 px-4 bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            You&apos;re on the list!
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Thank you for joining the founding beta. We&apos;ll be in touch soon with early access and the opportunity to help shape Steady.
          </p>
          <p className="text-sm text-muted-foreground">
            Check your inbox at <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-24 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-4">2-minute quiz</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 text-balance">
            Discover your eating pattern
          </h2>
          <p className="text-muted-foreground text-lg">
            Take the quiz and join our founding beta
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {Math.min(step + 1, questions.length)} of {questions.length}</span>
            <span>{Math.round((step / questions.length) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="p-8 md:p-10 rounded-3xl bg-background border border-border shadow-xl">
          {isEmailStep ? (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-foreground">
                Almost there! Where should we send your results?
              </h3>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                We&apos;ll send you personalized insights about your eating patterns and early access to the founding beta.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-foreground">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === "radio" ? (
                <RadioGroup
                  value={answers[currentQuestion.id] as string || ""}
                  onValueChange={handleRadioChange}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                        answers[currentQuestion.id] === option
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
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
                    const isChecked = ((answers[currentQuestion.id] as string[]) || []).includes(option);
                    return (
                      <label
                        key={option}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                          isChecked
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                        />
                        <span className="text-foreground">{option}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2 rounded-full px-6"
            >
              {isEmailStep ? "Join the beta" : isLastQuestion ? "Get my results" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
