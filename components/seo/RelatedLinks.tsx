import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface RelatedLink {
  label: string;
  href: string;
}

export interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

export function RelatedLinks({
  title = "You might also be interested in",
  links,
}: RelatedLinksProps) {
  if (!links.length) return null;

  return (
    <section className="mx-4 md:mx-8 lg:mx-16 py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-12">
        <h3 className="text-lg font-semibold text-muted-foreground mb-4">
          {title}
        </h3>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {link.label}
              <ArrowRight className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
