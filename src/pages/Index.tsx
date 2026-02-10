import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { CredibilitySection } from "@/components/sections/CredibilitySection";
import { NotForSection } from "@/components/sections/NotForSection";
import { WebinarOfferSection } from "@/components/sections/WebinarOfferSection";
import { FormSection } from "@/components/sections/FormSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FooterSection } from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <OutcomesSection />
      <CredibilitySection />
      <NotForSection />
      <WebinarOfferSection />
      <FormSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
};

export default Index;
