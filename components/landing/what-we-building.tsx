import { MessageCircle, Calendar, BookOpen, Video, Bell, Users } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "1:1 coaching",
    description: "Regular check-ins with coaches who understand neurodivergent eating patterns",
    status: "In development"
  },
  {
    icon: Calendar,
    title: "Flexible meal support",
    description: "Not rigid meal plans—adaptable frameworks that work with your brain and life",
    status: "In development"
  },
  {
    icon: BookOpen,
    title: "Education library",
    description: "Learn why your brain does what it does, and practical strategies that actually help",
    status: "In development"
  },
  {
    icon: Video,
    title: "Community sessions",
    description: "Group support with others who actually understand what you're going through",
    status: "Planned"
  },
  {
    icon: Bell,
    title: "Smart reminders",
    description: "Gentle nudges designed for ADHD brains—not annoying, actually helpful",
    status: "Planned"
  },
  {
    icon: Users,
    title: "GLP-1 and medication support",
    description: "GLP-1 evaluation and medication management may be available as one part of care through a clinical partner",
    status: "Future"
  }
];

export function WhatWeBuilding() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-medium mb-4">What we&apos;re building</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
            A complete support system for neurodivergent weight management
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We&apos;re building Steady with our founding beta members. Help us create what actually works.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  {feature.status}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
