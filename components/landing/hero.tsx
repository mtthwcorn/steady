"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Now accepting founding beta members
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance mb-6">
          Weight loss is harder when your brain makes food, cravings, and routines harder.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty leading-relaxed">
          A neurodivergent-friendly weight support program for people with ADHD, autism, or executive-function challenges who struggle with overeating, cravings, meal planning, sensory eating, and follow-through.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            onClick={scrollToQuiz}
            className="text-base px-8 py-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            Take the quiz and join the beta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Trust indicators */}
        <p className="mt-12 text-sm text-muted-foreground">
          Designed with input from neurodivergent adults and healthcare professionals
        </p>
      </div>
    </section>
  );
}
