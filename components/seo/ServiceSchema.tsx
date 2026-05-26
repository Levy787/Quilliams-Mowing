export interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: string[];
}

function resolveAbsoluteUrl(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("http")) return value;
  return `https://quilliamsmowing.co.uk${value.startsWith("/") ? "" : "/"}${value}`;
}

function areaToSchema(area: string) {
  if (area === "Cornwall") {
    return {
      "@type": "AdministrativeArea",
      name: area,
    };
  }

  return {
    "@type": "City",
    name: area,
  };
}

export function ServiceSchema({
  name,
  description,
  url,
  image,
  areaServed = [
    "Newquay",
    "Truro",
    "St Austell",
    "Bodmin",
    "Padstow",
    "Perranporth",
    "St Ives",
    "Wadebridge",
    "St Agnes",
    "Cornwall",
  ],
}: ServiceSchemaProps) {
  const isLawnCare = url.endsWith("/services/lawn-care");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    image: resolveAbsoluteUrl(image),
    provider: {
      "@id": "https://quilliamsmowing.co.uk/#business",
    },
    areaServed: areaServed.map(areaToSchema),
    serviceType: name,
    ...(isLawnCare
      ? {
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: "20",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "GBP",
            minPrice: "20",
            maxPrice: "50",
            description:
              "From £20 for a small lawn; £30 to £50 for an average-sized garden.",
          },
          availability: "https://schema.org/InStock",
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Cornwall",
          },
        },
      }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
