import { site } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-heading text-lg font-semibold text-navy">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {site.therapist}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block text-sm text-primary hover:underline"
            >
              {site.email}
            </a>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            {site.disclaimer}
          </p>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
