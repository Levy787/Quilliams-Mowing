export interface OfferCatalogItem {
  serviceSlug: string;
  name: string;
  description: string;
  minPrice?: number;
  maxPrice?: number;
  priceDescription?: string;
}

export interface OfferCatalogSchemaProps {
  name?: string;
  url?: string;
  items: OfferCatalogItem[];
}

const SITE = "https://quilliamsmowing.co.uk";

export function OfferCatalogSchema({
  name = "Quilliams Gardening & Landscaping Services",
  url = `${SITE}/pricing`,
  items,
}: OfferCatalogSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${url}#offer-catalog`,
    name,
    url,
    provider: {
      "@id": `${SITE}/#business`,
    },
    itemListElement: items.map((item) => {
      const offer: Record<string, unknown> = {
        "@type": "Offer",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE}/services/${item.serviceSlug}#service`,
          name: item.name,
          description: item.description,
          url: `${SITE}/services/${item.serviceSlug}`,
          provider: {
            "@id": `${SITE}/#business`,
          },
        },
      };

      if (item.minPrice != null && item.maxPrice != null) {
        offer.priceSpecification = {
          "@type": "PriceSpecification",
          priceCurrency: "GBP",
          minPrice: String(item.minPrice),
          maxPrice: String(item.maxPrice),
          ...(item.priceDescription ? { description: item.priceDescription } : {}),
        };
      } else if (item.priceDescription) {
        offer.description = item.priceDescription;
      }

      return offer;
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
