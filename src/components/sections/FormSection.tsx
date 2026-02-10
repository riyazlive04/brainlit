import { RegistrationForm } from "@/components/RegistrationForm";
import { Shield } from "lucide-react";

export function FormSection() {
  return (
    <section id="registration-form" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="headline-md text-foreground mb-3">
              Reserve Your Free Seat
            </h2>
            <p className="text-muted-foreground">
              Enter your details below. Webinar link will be sent to your WhatsApp.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 sm:p-8 shadow-card border border-border">
            <RegistrationForm />
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your information is secure and will never be shared.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
