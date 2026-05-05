export interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  telephone?: string;
  email?: string;
  url?: string;
  areaServed?: string[];
  priceRange?: string;
}

const GOOGLE_BUSINESS_PROFILE_URL = "https://g.page/r/Ca1e8ukWV-qsEBM/";
const COMPANIES_HOUSE_URL = "https://find-and-update.company-information.service.gov.uk/company/16405915";
const WASTE_CARRIER_REGISTER_URL =
  "https://environment.data.gov.uk/public-register/waste-carriers-brokers/registration/CBDL582202?__pageState=result-waste-carriers-brokers";

export function LocalBusinessSchema({
  name = "Quilliams Gardening & Landscaping",
  description = "Professional gardening, landscaping, lawn mowing, hedge trimming and garden maintenance services in Newquay, Truro, and St Austell, Cornwall.",
  telephone = "+447593121621",
  email = "levi@quilliamsmowing.co.uk",
  url = "https://quilliamsmowing.co.uk",
  areaServed = ["Newquay", "Truro", "St Austell", "Cornwall"],
  priceRange = "££",
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LandscapingBusiness", "LocalBusiness", "Organization"],
    "@id": `${url}/#business`,
    name,
    legalName: "Quilliams Mowing Ltd",
    alternateName: "Quilliams Gardening & Landscaping",
    description,
    url,
    telephone,
    email,
    priceRange,
    founder: {
      "@type": "Person",
      name: "Levi Quilliam",
    },
    identifier: [
      {
        "@type": "PropertyValue",
        name: "Companies House company number",
        propertyID: "Companies House",
        value: "16405915",
        url: COMPANIES_HOUSE_URL,
      },
      {
        "@type": "PropertyValue",
        name: "Waste carrier registration",
        propertyID: "Environment Agency",
        value: "CBDL582202",
        url: WASTE_CARRIER_REGISTER_URL,
      },
    ],
    image: `${url}/images/uploads/site/branding/logoFile.webp`,
    logo: `${url}/images/uploads/site/branding/logoFile.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Newquay",
      addressRegion: "Cornwall",
      postalCode: "TR8",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.41200,
      longitude: -5.07570,
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      GOOGLE_BUSINESS_PROFILE_URL,
      COMPANIES_HOUSE_URL,
      WASTE_CARRIER_REGISTER_URL,
      "https://www.facebook.com/quilliamsmowing",
      "https://www.instagram.com/quilliamsmowing",
      "https://www.tiktok.com/@quilliamsmowing",
      "https://www.yell.com/biz/quilliams-mowing-ltd-newquay-10969895/",
      "https://www.checkatrade.com/trades/quilliamsmowingltd",
      "https://www.bark.com/en/gb/b/quilliams-gardening-amp-landscaping/KNoMX4/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
