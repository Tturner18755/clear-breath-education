import { site } from "@/config/site";

export function Disclaimer() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border-l-4 border-disclaimer-border bg-disclaimer-bg px-6 py-6 sm:px-8 sm:py-7">
          <p className="font-heading text-lg font-bold leading-snug text-navy sm:text-xl">
            {site.disclaimer}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            If you have a medical emergency or urgent health concern, contact
            your licensed healthcare provider or call emergency services
            immediately. Educational coaching does not replace professional
            medical care.
          </p>
        </div>
      </div>
    </section>
  );
}
