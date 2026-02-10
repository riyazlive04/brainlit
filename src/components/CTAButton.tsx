import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  className?: string;
  size?: "default" | "lg" | "xl";
}

export function CTAButton({ className, size = "xl" }: CTAButtonProps) {
  const scrollToForm = () => {
    const formElement = document.getElementById("registration-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Button
      variant="heroCta"
      size={size}
      onClick={scrollToForm}
      className={className}
    >
      Join Free Parent Webinar
      <ArrowRight className="ml-1 h-5 w-5" />
    </Button>
  );
}
