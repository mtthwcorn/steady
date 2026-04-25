import { ShieldCheck, Heart, AlertCircle, Lock } from "lucide-react";

const commitments = [
  {
    icon: ShieldCheck,
    title: "Evidence-based approach",
    description: "Our methods are grounded in research on neurodivergent eating patterns and behavior change. We don't promise quick fixes."
  },
  {
    icon: Heart,
    title: "No shame, no blame",
    description: "We believe weight challenges in neurodivergent people often stem from brain differences, not character flaws. Our approach reflects that."
  },
  {
    icon: AlertCircle,
    title: "Not a substitute for medical care",
    description: "Steady is a support program, not medical treatment. We encourage working with your healthcare providers."
  },
  {
    icon: Lock,
    title: "Your privacy matters",
    description: "Your health information is sensitive. We're committed to protecting your data and never selling it to third parties."
  }
];

export function ResponsibleCare() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-medium mb-4">Our commitment</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
            Responsible, compassionate care
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We take our responsibility seriously. Here&apos;s what you can expect from us.
          </p>
        </div>

        {/* Commitments grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {commitments.map((commitment, index) => (
            <div key={index} className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <commitment.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {commitment.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 rounded-2xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            <strong className="text-foreground">Important note:</strong> Steady does not diagnose ADHD, autism, binge eating disorder, or other conditions. We do not prescribe medications directly today. GLP-1 evaluation and medication management may be available in the future through a clinical partner. If you&apos;re struggling with disordered eating, please reach out to a qualified healthcare professional.
          </p>
        </div>
      </div>
    </section>
  );
}
