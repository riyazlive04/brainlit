import { AlertTriangle } from "lucide-react";

const problems = [
  "Your child spends hours on screens - but you're not sure if it's learning or just consumption",
  "AI tools like ChatGPT are everywhere - but your child might be using them to avoid thinking, not improve it",
  "Schools teach subjects, but no one is teaching how to think critically in an AI-dominated world",
  "You worry about AI-generated misinformation, deepfakes, and ethical traps - and your child has no filter for them",
  "Every year without the right foundation makes poor thinking habits harder to undo",
];

export function ProblemSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="headline-lg text-foreground mb-4">The Uncomfortable Truth Most Parents Avoid</h2>
          <p className="body-md text-muted-foreground">
            These aren't scare tactics. These are realities playing out in homes across Chennai right now.
          </p>
        </div>

        <ul className="space-y-5">
          {problems.map((problem, index) => (
            <li
              key={index}
              className="flex items-start gap-4 p-5 bg-background rounded-lg shadow-soft border border-border"
            >
              <AlertTriangle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
              <span className="body-md text-foreground">{problem}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
