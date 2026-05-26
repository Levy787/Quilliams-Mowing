const SITE_URL = "https://quilliamsmowing.co.uk";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about#levi`,
    name: "Levi Quilliam",
    givenName: "Levi",
    familyName: "Quilliam",
    jobTitle: "Founder and Lead Gardener",
    worksFor: {
      "@id": `${SITE_URL}/#business`,
    },
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/images/uploads/faq/levi-headshot-v2.jpg`,
    description:
      "Levi Quilliam is the founder and lead gardener at Quilliams Gardening & Landscaping, providing lawn care, hedge trimming, garden maintenance and practical landscaping across Newquay and Cornwall.",
    homeLocation: {
      "@type": "Place",
      name: "Trevarrian, Cornwall",
    },
    knowsAbout: [
      "Lawn care",
      "Hedge trimming",
      "Garden maintenance",
      "Landscape design",
      "Gravel gardens",
      "Cornish coastal planting",
      "Green waste removal",
    ],
    sameAs: [
      "https://www.facebook.com/quilliamsmowing",
      "https://www.instagram.com/quilliamsmowing",
      "https://www.tiktok.com/@quilliamsmowing",
      "https://www.checkatrade.com/trades/quilliamsmowingltd",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
