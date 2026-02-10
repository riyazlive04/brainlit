import { CheckCircle2 } from "lucide-react";

const outcomes = [
  {
    title: "Critical Thinking Over Copy-Pasting",
    description: "Your child will learn to question AI outputs, not blindly accept them.",
  },
  {
    title: "Ethical AI Awareness",
    description: "Understanding deepfakes, misinformation, and responsible AI usage.",
  },
  {
    title: "Problem-Solving Frameworks",
    description: "Structured thinking methods that work with or without AI tools.",
  },
  {
    title: "Screen Time with Purpose",
    description: "Transform passive consumption into active, creative engagement.",
  },
  {
    title: "Confidence in Digital Conversations",
    description: "Your child will understand AI well enough to explain it to others.",
  },
  {
    title: "Foundation for Future Learning",
    description: "Skills that compound as AI becomes more integrated into education and work.",
  },
];

export function OutcomesSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: "hsl(var(--section-alt))" }}>
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="headline-lg text-foreground mb-4">What Your Child Will Walk Away With</h2>
          <p className="body-md text-muted-foreground">Tangible, observable changes - not vague promises.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-background rounded-lg shadow-soft border border-border"
            >
              <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1 font-sans">{outcome.title}</h3>
                <p className="text-muted-foreground">{outcome.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
