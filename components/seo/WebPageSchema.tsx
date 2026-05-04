export interface WebPageSchemaProps {
  name: string;
  description: string;
  url?: string;
  image?: string;
}

export function WebPageSchema({
  name,
  description,
  url = "https://quilliamsmowing.co.uk",
  image = "https://quilliamsmowing.co.uk/images/uploads/site/og-image.png?v=20260504",
}: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name,
    description,
    isPartOf: {
      "@id": "https://quilliamsmowing.co.uk/#website",
    },
    about: {
      "@id": "https://quilliamsmowing.co.uk/#business",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
