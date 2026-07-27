import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PRIMARY_LINKS = [
  {
    href: "/services",
    label: "Gardening Services",
    description: "Explore lawn care, hedge trimming, maintenance and landscaping.",
  },
  {
    href: "/services/lawn-care",
    label: "Lawn Mowing",
    description: "See regular mowing options, what is included and prices from £20.",
  },
  {
    href: "/pricing",
    label: "Gardening Prices",
    description: "Plan your budget with clear 2026 price ranges for common jobs.",
  },
  {
    href: "/quote",
    label: "Get a Free Quote",
    description: "Send a postcode, short description and photos for a clear quote.",
  },
] as const;

export function PrimarySitelinks() {
  return (
    <section
      aria-labelledby="popular-pages-heading"
      className="mx-4 py-8 md:mx-8 md:py-10 lg:mx-16"
    >
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Popular pages
            </p>
            <h2
              id="popular-pages-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              Find the right garden service
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-right">
            Quick links to the information customers use most before booking.
          </p>
        </div>

        <nav
          aria-label="Popular gardening pages"
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRIMARY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/50 hover:bg-muted/40"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="text-base font-semibold text-foreground group-hover:text-primary">
                  {item.label}
                </span>
                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
