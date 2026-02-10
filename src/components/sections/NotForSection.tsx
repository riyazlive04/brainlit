import { XCircle } from "lucide-react";

const notForList = [
  'Parents looking for a quick fix or a "make my kid a coder" program',
  "Those not ready to invest time in their child's foundational thinking skills",
  "Parents who want their child to use AI without understanding its implications",
  "Those who believe AI is just a fad that will pass",
];

export function NotForSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="headline-lg text-foreground mb-4">This Is NOT For Every Parent</h2>
          <p className="body-md text-muted-foreground">We're selective because results require the right fit.</p>
        </div>

        <ul className="space-y-4">
          {notForList.map((item, index) => (
            <li key={index} className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border">
              <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
              <span className="body-md text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
