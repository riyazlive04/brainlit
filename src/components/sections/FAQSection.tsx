import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this webinar really free?",
    answer:
      "Yes, completely free. No credit card, no hidden charges. This is our way of helping parents understand the landscape before making any decisions.",
  },
  {
    question: "My child is younger/older than 10. Can they still benefit?",
    answer:
      "The Kids AI Bootcamp is specifically designed for 10-year-olds. However, the webinar insights are valuable for parents of children aged 8-12. The bootcamp curriculum is most effective for the 10-year-old developmental stage.",
  },
  {
    question: "Do I need any technical knowledge to attend?",
    answer:
      "Not at all. This webinar is designed for parents, not tech professionals. We explain everything in simple, practical terms.",
  },
  {
    question: "Will I be sold something during the webinar?",
    answer:
      "We will share information about the Kids AI Bootcamp at the end for parents who want to continue the journey. The majority of the webinar is pure, actionable content.",
  },
  {
    question: "Can both parents attend?",
    answer: "Absolutely. In fact, we encourage it. Aligned parenting makes implementation much more effective.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: "hsl(var(--section-alt))" }}>
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="headline-lg text-foreground mb-4">Common Questions</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-background border border-border rounded-lg px-6 shadow-soft"
            >
              <AccordionTrigger className="text-left font-sans font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
