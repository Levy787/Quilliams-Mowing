import Script from "next/script";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const SITE_URL = "https://quilliamsmowing.co.uk";

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
