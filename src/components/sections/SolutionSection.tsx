import { Lightbulb } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
            <Lightbulb className="h-8 w-8 text-secondary" />
          </div>

          <h2 className="headline-lg text-foreground mb-6">Introducing Kids AI Bootcamp</h2>

          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            A structured, ethics-first program designed specifically for 10-year-olds in Chennai. We don't teach
            children to use AI tools faster. We teach them to think better - so they can use any tool wisely, now and in
            the future.
          </p>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            This free webinar helps parents decide whether their child actually needs this foundation - or not.
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-card border border-border">
          <p className="headline-md text-foreground text-center italic">
            "The goal is not to make your child an AI expert. The goal is to make your child
            <span className="text-secondary"> a thinker who happens to understand AI.</span>"
          </p>
        </div>
      </div>
    </section>
  );
}
