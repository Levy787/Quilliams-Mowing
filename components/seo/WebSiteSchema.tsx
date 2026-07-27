export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://quilliamsmowing.co.uk/#website",
    name: "Quilliams",
    alternateName: [
      "Quilliams Gardening & Landscaping",
      "Quilliams Mowing",
      "quilliamsmowing.co.uk",
    ],
    url: "https://quilliamsmowing.co.uk/",
    inLanguage: "en-GB",
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
