export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://quilliamsmowing.co.uk/#website",
    name: "Quilliams Gardening & Landscaping",
    url: "https://quilliamsmowing.co.uk",
    publisher: {
      "@id": "https://quilliamsmowing.co.uk/#business",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
