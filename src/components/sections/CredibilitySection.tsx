export function CredibilitySection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="headline-lg text-foreground mb-4">Our Teaching Philosophy</h2>
        </div>

        <div className="space-y-8">
          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <h3 className="headline-md text-foreground mb-4">We Don't Teach Tools. We Build Thinkers.</h3>
            <p className="body-md text-muted-foreground mb-4">
              Most AI courses for kids focus on prompts and outputs. We focus on the mind behind the keyboard. Our
              curriculum is built on cognitive science, not trends.
            </p>
            <p className="body-md text-muted-foreground mb-4">
              Every activity is designed to strengthen your child's ability to question, analyze, and create - skills
              that will matter long after today's AI tools become obsolete.
            </p>
            <p className="body-md text-muted-foreground">
              Every session forces children to explain “why”, not just give answers.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 flex flex-col items-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-secondary mb-2 whitespace-nowrap">Ethics-First</p>
              <p className="text-muted-foreground">Every lesson includes responsible AI principles</p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-secondary mb-2 whitespace-nowrap">Age-Appropriate</p>
              <p className="text-muted-foreground">Designed specifically for 10-year-old cognition</p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-secondary mb-2 whitespace-nowrap">Parent-Inclusive</p>
              <p className="text-muted-foreground">You'll know exactly what your child is learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
