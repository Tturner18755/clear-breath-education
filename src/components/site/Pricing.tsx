import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const { intro, standard, pack } = site.offers;

export function Pricing() {
  const bookHref = site.vagaroUrl || "#booking";

  return (
    <section id="pricing" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Session pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cash-pay educational coaching. Packs cost less per session than
            booking one at a time.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <p className="text-sm font-medium text-muted-foreground">First visit</p>
              <CardTitle className="text-xl">{intro.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-heading text-4xl font-bold text-navy">
                ${intro.price}
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  / {intro.minutes} min
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                A focused first session to cover one topic and see if this
                format is a fit.
              </p>
              <a href={bookHref}>
                <Button variant="outline" className="w-full">
                  Book intro
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-primary/30 shadow-md ring-1 ring-primary/20">
            <CardHeader>
              <p className="text-sm font-medium text-primary">Most booked</p>
              <CardTitle className="text-xl">{standard.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-heading text-4xl font-bold text-navy">
                ${standard.price}
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  / {standard.minutes} min
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Full education hour. Equipment walkthrough, practice, and time
                for your questions.
              </p>
              <a href={bookHref}>
                <Button className="w-full">Book 60 minutes</Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <p className="text-sm font-medium text-muted-foreground">Best value</p>
              <CardTitle className="text-xl">{pack.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-heading text-4xl font-bold text-navy">
                ${pack.price}
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  / {pack.sessions} × {pack.minutesEach} min
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                ${pack.perSession} per session — save $
                {standard.price * pack.sessions - pack.price} versus three
                singles. Unused sessions stay on your profile.
              </p>
              <a href={bookHref}>
                <Button variant="secondary" className="w-full">
                  Get the 3-pack
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Longer than 60 minutes is not listed. If you need extra time, ask —
          it is priced as a premium add-on. All sessions are educational
          coaching only.
        </p>
      </div>
    </section>
  );
}
