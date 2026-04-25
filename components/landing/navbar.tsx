"use client";

import { Button } from "@/components/ui/button";

export function Navbar() {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="font-serif text-primary-foreground font-bold">S</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:block">Steady</span>
        </div>

        {/* CTA */}
        <Button 
          onClick={scrollToQuiz}
          className="rounded-full"
        >
          Join the beta
        </Button>
      </div>
    </nav>
  );
}
