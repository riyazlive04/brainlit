import { Clock, Video, Gift } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

const webinarBenefits = [
  "The 3 invisible habits that make children passive AI users (and how to reverse them)",
  "A simple framework to evaluate if your child is thinking or just prompting",
  'What "AI-ready" actually means for a 10-year-old - beyond coding and tech skills',
  "The ethics conversation every parent must have before it's too late",
  "How to structure screen time around learning, not consumption",
];

export function WebinarOfferSection() {
  return (
    <section className="section-padding gradient-hero text-primary-foreground">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="headline-lg mb-4">Free Live Webinar for Chennai Parents</h2>
          <p className="body-lg text-primary-foreground/85 max-w-xl mx-auto">
            60 minutes that could change how you think about your child's relationship with technology.
          </p>
        </div>

        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8 mb-10 border border-primary-foreground/20">
          <h3 className="font-sans font-semibold text-xl mb-6 text-center">What You'll Learn in This Webinar:</h3>
          <h4 className="font-sans font-semibold text-xl mb-6 text-center">
            By the end of this webinar, you’ll know exactly how to guide your child’s AI usage - with clarity, not fear.
          </h4>
          <ul className="space-y-4">
            {webinarBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-primary-foreground/90">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Video className="h-5 w-5" />
            <span>Live Interactive Session</span>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Clock className="h-5 w-5" />
            <span>60 Minutes</span>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Gift className="h-5 w-5" />
            <span>Completely Free</span>
          </div>
        </div>

        <div className="text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
