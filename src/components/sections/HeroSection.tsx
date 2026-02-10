import { CTAButton } from "@/components/CTAButton";

export function HeroSection() {
  return (
    <section className="gradient-hero text-primary-foreground section-padding">
      <div className="container-narrow text-center">
        <p className="text-sm sm:text-base uppercase tracking-widest text-primary-foreground/70 mb-4 animate-fade-in">
          Free Live Webinar for Parents in Chennai
        </p>

        <h1 className="headline-xl mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Help Your 10-Year-Old Become an AI-Ready Thinker Not Just Another Screen User
        </h1>

        <p
          className="body-lg text-primary-foreground/85 mb-10 max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          A practical bootcamp that transforms how your child thinks, questions, and uses AI — before the wrong habits
          take hold.
        </p>

        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <CTAButton />
        </div>

        <p className="text-sm text-primary-foreground/60 mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          60-minute live session • Parent-only • Completely free
        </p>
      </div>
    </section>
  );
}
