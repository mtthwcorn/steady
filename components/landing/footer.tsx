"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Final CTA */}
      <div className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-balance">
            Ready to try a different approach?
          </h2>
          <p className="text-background/70 text-lg leading-relaxed mb-10">
            Join our founding beta and help us build weight support that actually works for neurodivergent brains.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={scrollToQuiz}
              className="bg-background text-foreground hover:bg-background/90 text-base px-8 py-6 rounded-full"
            >
              Take the quiz and join the beta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-background/10 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-serif text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-semibold">Steady</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">Privacy</a>
            <a href="#" className="hover:text-background transition-colors">Terms</a>
            <a href="#" className="hover:text-background transition-colors">Contact</a>
          </div>

          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Steady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
