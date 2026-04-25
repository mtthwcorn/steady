import { Heart, Users, Sparkles, Shield } from "lucide-react";

const principles = [
  {
    icon: Heart,
    title: "Shame-free support",
    description: "We understand that your relationship with food is complex. Our approach is compassionate, not punishing."
  },
  {
    icon: Users,
    title: "Built for neurodivergent brains",
    description: "Developed with input from people who actually live with ADHD, autism, and executive-function challenges."
  },
  {
    icon: Sparkles,
    title: "Flexible, not rigid",
    description: "Real strategies that work with your brain, not against it. Adaptable to bad days, sensory needs, and changing routines."
  },
  {
    icon: Shield,
    title: "Clinician-guided care",
    description: "Access to professionals who understand neurodivergence. GLP-1 evaluation and medication management may be available in the future through a clinical partner."
  }
];

export function Solution() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-medium mb-4">Our approach</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
            A different kind of weight support program
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Steady is designed from the ground up for people whose brains make eating, planning, and consistency genuinely harder.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-5">
                <principle.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3">
                {principle.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
