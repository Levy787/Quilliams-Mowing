export interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  telephone?: string;
  email?: string;
  url?: string;
  areaServed?: string[];
  priceRange?: string;
}

export function LocalBusinessSchema({
  name = "Quilliams Gardening & Landscaping",
  description = "Professional gardening, landscaping, lawn mowing, hedge trimming and garden maintenance services in Newquay, Truro, and St Austell, Cornwall.",
  telephone = "07593121621",
  email = "info@quilliamsmowing.co.uk",
  url = "https://quilliamsmowing.co.uk",
  areaServed = ["Newquay", "Truro", "St Austell", "Cornwall"],
  priceRange = "££",
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#business`,
    name,
    description,
    url,
    telephone,
    email,
    priceRange,
    image: `${url}/images/uploads/site/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Newquay",
      addressRegion: "Cornwall",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.412,
      longitude: -5.0757,
    },
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    serviceType: [
      "Lawn Mowing",
      "Hedge Trimming",
      "Garden Maintenance",
      "Landscaping",
      "Garden Cleanup",
      "Weed Control",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/quilliamsmowing",
      "https://www.instagram.com/quilliamsmowing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
