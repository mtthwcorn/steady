"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const profiles = [
  {
    id: "impulse",
    name: "The Impulse Eater",
    color: "bg-chart-1",
    description: "You see food, you eat food. By the time you think about it, you've already finished the bag. It's not about hunger—it's about the dopamine hit.",
    traits: ["Snacks without thinking", "Eats when bored or understimulated", "Struggles with portion control", "Often regrets eating decisions after"]
  },
  {
    id: "comfort",
    name: "The Comfort Seeker",
    color: "bg-chart-2",
    description: "Food is safety. It's regulation. It's the one thing that reliably makes you feel better—until it doesn't.",
    traits: ["Eats to manage emotions", "Has specific comfort foods", "Food feels like self-care", "Eating is a coping mechanism"]
  },
  {
    id: "sensory",
    name: "The Sensory Eater",
    color: "bg-chart-3",
    description: "Texture matters. Temperature matters. The \"healthy\" food people recommend makes you gag. Your safe foods list is short.",
    traits: ["Strong texture preferences", "Limited \"safe\" foods", "Difficulty trying new foods", "Specific food preparation needs"]
  },
  {
    id: "chaotic",
    name: "The Chaotic Eater",
    color: "bg-chart-4",
    description: "You forget to eat all day, then eat everything at night. Meal planning sounds great in theory. In practice? Chaos.",
    traits: ["Inconsistent meal timing", "Forgets to eat until starving", "Night eating is common", "Meal prep never sticks"]
  },
  {
    id: "fixation",
    name: "The Fixation Eater",
    color: "bg-chart-5",
    description: "You find something you like and eat it for every meal—until suddenly you can't stand it anymore. Then you find the next thing.",
    traits: ["Same food for days/weeks", "Sudden food aversions", "Intense food preferences", "All-or-nothing patterns"]
  }
];

export function EatingProfiles() {
  const [activeProfile, setActiveProfile] = useState(profiles[0]);

  return (
    <section className="py-24 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-medium mb-4">Eating patterns</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
            Which eating pattern sounds like you?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Most neurodivergent people recognize themselves in multiple patterns. Understanding yours is the first step.
          </p>
        </div>

        {/* Profile selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfile(profile)}
              className={cn(
                "px-5 py-3 rounded-full text-sm font-medium transition-all duration-300",
                activeProfile.id === profile.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-background border border-border hover:border-primary/30 text-foreground"
              )}
            >
              {profile.name}
            </button>
          ))}
        </div>

        {/* Active profile card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 md:p-10 rounded-3xl bg-background border border-border shadow-xl">
            {/* Decorative accent */}
            <div className={cn("absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl", activeProfile.color)} />
            
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              {activeProfile.name}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {activeProfile.description}
            </p>
            
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground mb-4">Common traits:</p>
              {activeProfile.traits.map((trait, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", activeProfile.color)} />
                  <span className="text-muted-foreground">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
