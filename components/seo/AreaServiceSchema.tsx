export type AreaServiceSchemaProps = {
  slug: string;
  name: string;
  county: string;
  latitude: number;
  longitude: number;
  radiusMeters?: number;
};

export function AreaServiceSchema({
  slug,
  name,
  county,
  latitude,
  longitude,
  radiusMeters = 15000,
}: AreaServiceSchemaProps) {
  const pageUrl = `https://quilliamsmowing.co.uk/areas/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Gardening Services in ${name}`,
    serviceType: "Gardening",
    provider: {
      "@id": "https://quilliamsmowing.co.uk/#business",
    },
    url: pageUrl,
    areaServed: [
      {
        "@type": "City",
        name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: county,
        },
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: latitude.toFixed(5),
          longitude: longitude.toFixed(5),
        },
        geoRadius: String(radiusMeters),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
