import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { Solution } from "@/components/landing/solution";
import { EatingProfiles } from "@/components/landing/eating-profiles";
import { WhatWeBuilding } from "@/components/landing/what-we-building";
import { QuizForm } from "@/components/landing/quiz-form";
import { ResponsibleCare } from "@/components/landing/responsible-care";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Problem />
        <Solution />
        <EatingProfiles />
        <WhatWeBuilding />
        <QuizForm />
        <ResponsibleCare />
        <Footer />
      </div>
    </main>
  );
}
