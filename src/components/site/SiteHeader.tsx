import { useState } from "react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#booking", label: "Booking" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 font-heading text-lg font-semibold text-navy">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3c-1.5 2.5-4 4-4 7.5a4 4 0 0 0 8 0C16 7 13.5 5.5 12 3z" />
              <path d="M8 14.5c-1.5 1-2.5 2.5-2.5 4.5a2.5 2.5 0 0 0 5 0c0-2-1-3.5-2.5-4.5" />
              <path d="M16 14.5c1.5 1 2.5 2.5 2.5 4.5a2.5 2.5 0 0 1-5 0c0-2 1-3.5 2.5-4.5" />
            </svg>
          </span>
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#booking">
            <Button className="hidden sm:inline-flex">Book an Education Session</Button>
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border/60 bg-background md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="mt-2 block">
            <Button className="w-full">Book an Education Session</Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
