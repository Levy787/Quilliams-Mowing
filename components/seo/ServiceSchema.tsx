import Script from "next/script";

export interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
  areaServed?: string[];
}

export function ServiceSchema({
  name,
  description,
  url,
  image,
  provider = "Quilliams Gardening & Landscaping",
  areaServed = ["Newquay", "Truro", "St Austell", "Cornwall"],
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    image,
    provider: {
      "@type": "LocalBusiness",
      name: provider,
      url: "https://quilliamsmowing.co.uk",
    },
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    serviceType: name,
  };

  return (
    <Script
      id={`service-schema-${name.toLowerCase().replace(/\s+/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
