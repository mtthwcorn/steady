import { Brain, Utensils, Clock, Repeat } from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Your brain works differently",
    description: "ADHD, autism, and executive-function differences can make food decisions, impulse control, and routine-building genuinely harder—not a willpower problem."
  },
  {
    icon: Utensils,
    title: "Sensory and emotional eating",
    description: "Texture sensitivities, comfort eating, and food fixations are real. Generic meal plans don't understand why you can't just \"eat the vegetables.\""
  },
  {
    icon: Clock,
    title: "Time blindness & planning",
    description: "Meal prep requires executive function you may not have. By the time you're hungry, it's already too late to make a \"healthy\" choice."
  },
  {
    icon: Repeat,
    title: "Consistency is the hardest part",
    description: "You can start strong. But maintaining habits without external structure, accountability, and understanding? That's where things fall apart."
  }
];

export function Problem() {
  return (
    <section className="py-24 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-medium mb-4">The real problem</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
            Traditional weight loss programs weren&apos;t designed for brains like yours
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Most programs assume you can just follow the plan. They don&apos;t account for how neurodivergent brains actually work.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
