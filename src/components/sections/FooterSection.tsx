import { CTAButton } from "@/components/CTAButton";

export function FooterSection() {
  return (
    <footer className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow text-center">
        <h2 className="headline-md mb-4">
          Your Child's Relationship with AI Starts Now
        </h2>
        <p className="body-md text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          The question isn't whether your child will use AI. The question is whether they'll use it 
          wisely. This free webinar is your first step toward ensuring the answer is yes.
        </p>
        
        <CTAButton />

        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Kids AI Bootcamp. Chennai, Tamil Nadu.
          </p>
        </div>
      </div>
    </footer>
  );
}
