import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wind,
  HeartPulse,
  Activity,
  Droplets,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Wind,
    title: "CPAP / BiPAP education",
    description:
      "Learn how to set up, adjust, and care for your CPAP or BiPAP equipment. Focus on comfort tips, mask fitting concepts, and daily routines that support consistent use.",
  },
  {
    icon: HeartPulse,
    title: "COPD & asthma self-management education",
    description:
      "Understand common self-management strategies, action-plan concepts, and how to recognize patterns in your breathing so you can discuss them with your care team.",
  },
  {
    icon: Activity,
    title: "Breathing & airway clearance techniques",
    description:
      "Practice and review evidence-based breathing and airway-clearance methods in a teaching format so you can use them independently at home.",
  },
  {
    icon: Droplets,
    title: "Home oxygen equipment training",
    description:
      "Get clear instruction on concentrators, portable systems, tubing, and safety practices so you feel comfortable operating your equipment day to day.",
  },
  {
    icon: Sparkles,
    title: "Pulmonary hygiene routines",
    description:
      "Build simple, sustainable daily and weekly routines for cleaning equipment and supporting airway hygiene through education and guided practice.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            What you can learn
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Practical, equipment-focused education delivered one-on-one.
            Everything is teaching and coaching — never diagnosis or treatment
            plans.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="border-border/80 transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <service.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
