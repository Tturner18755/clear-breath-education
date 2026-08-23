import { site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              About your educator
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {site.therapist} brings more than a decade of bedside respiratory
              care experience into a teaching-first approach.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The focus is practical education: helping you understand your
              equipment, practice techniques, and build confidence so you can
              manage day-to-day use independently. Sessions are structured as
              coaching and instruction, not clinical care.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Registered Respiratory Therapist (RRT)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                10+ years of acute and critical care experience
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Teaching-focused philosophy for clear, usable skills
              </li>
            </ul>
          </div>

          <Card className="border-border/80 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-navy">
                What a session is — and is not
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                    A session is
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Equipment education",
                      "Technique demonstration & practice",
                      "Questions answered in plain language",
                      "Confidence-building coaching",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    A session is not
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Medical diagnosis",
                      "Treatment or therapy plans",
                      "Prescriptions or orders",
                      "A substitute for your provider",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
