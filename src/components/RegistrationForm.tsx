import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  parentName: z.string().trim().min(2, "Please enter your parent's name").max(50, "Name is too long"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please enter a valid email address").max(100, "Email is too long"),
  location: z.string().trim().min(2, "Please enter your location").max(100, "Location is too long"),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    whatsapp: "",
    email: "",
    location: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Supabase
      const { error } = await supabase.from('registrations').insert({
        parent_name: result.data.parentName,
        whatsapp: result.data.whatsapp,
        email: result.data.email,
        location: result.data.location,
        registered_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      // Trigger webhook
      try {
        await fetch('https://n8n.srv930949.hstgr.cloud/webhook/brainlit-bootcamp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parentName: result.data.parentName,
            whatsapp: result.data.whatsapp,
            email: result.data.email,
            location: result.data.location,
            registeredAt: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
        // Don't fail the submission if webhook fails
      }

      // Save to localStorage as backup
      const existing = JSON.parse(localStorage.getItem("webinar_registrations") || "[]");
      existing.push({ ...result.data, registeredAt: new Date().toISOString() });
      localStorage.setItem("webinar_registrations", JSON.stringify(existing));

      toast.success("Registration Successful!", {
        description: "You will receive webinar details on WhatsApp shortly.",
      });

      setFormData({ parentName: "", whatsapp: "", email: "", location: "" });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Registration failed", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="parentName" className="text-foreground font-medium">
          Parent's Name
        </Label>
        <Input
          id="parentName"
          type="text"
          placeholder="Enter your parent's name"
          value={formData.parentName}
          onChange={handleChange("parentName")}
          className={`h-12 bg-background border-border focus:border-secondary focus:ring-secondary ${
            errors.parentName ? "border-destructive" : ""
          }`}
        />
        {errors.parentName && <p className="text-sm text-destructive">{errors.parentName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="text-foreground font-medium">
          WhatsApp Number
        </Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="10-digit mobile number"
          value={formData.whatsapp}
          onChange={handleChange("whatsapp")}
          maxLength={10}
          className={`h-12 bg-background border-border focus:border-secondary focus:ring-secondary ${
            errors.whatsapp ? "border-destructive" : ""
          }`}
        />
        {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Email ID
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange("email")}
          className={`h-12 bg-background border-border focus:border-secondary focus:ring-secondary ${
            errors.email ? "border-destructive" : ""
          }`}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-foreground font-medium">
          Location
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="City or Area (e.g., Anna Nagar, Chennai)"
          value={formData.location}
          onChange={handleChange("location")}
          className={`h-12 bg-background border-border focus:border-secondary focus:ring-secondary ${
            errors.location ? "border-destructive" : ""
          }`}
        />
        {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
      </div>

      <Button type="submit" variant="cta" size="xl" className="w-full mt-6" disabled={isSubmitting}>
        {isSubmitting ? "Reserving Your Spot..." : "Join Free Parent Webinar"}
      </Button>

      <p className="text-center text-sm text-muted-foreground pt-2">
        Limited seats. You'll receive the webinar link on WhatsApp.
      </p>
    </form>
  );
}
