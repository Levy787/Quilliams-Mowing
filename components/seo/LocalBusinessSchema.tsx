import { areas } from "@/lib/areas/data";

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
const PERSON_ID = "https://quilliamsmowing.co.uk/about#levi";
const BUSINESS_LATITUDE = 50.4772;
const BUSINESS_LONGITUDE = -4.9836;
const DEFAULT_AREA_SERVED = [
  ...Object.values(areas)
    .filter((area) => !area.noindex)
    .map((area) => area.name),
  "Cornwall",
];

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

export function LocalBusinessSchema({
  name = "Quilliams Gardening & Landscaping",
  description = "Professional gardening, landscaping, lawn mowing, hedge trimming and garden maintenance from Trevarrian near Newquay, serving Padstow, Wadebridge and north Cornwall.",
  telephone = "+447593121621",
  email = "levi@quilliamsmowing.co.uk",
  url = "https://quilliamsmowing.co.uk",
  areaServed = DEFAULT_AREA_SERVED,
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
    currenciesAccepted: "GBP",
    paymentAccepted: ["Bank transfer", "Card", "Cash"],
    foundingDate: "2025-04-24",
    founder: {
      "@id": PERSON_ID,
    },
    employee: {
      "@id": PERSON_ID,
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
    image: `${url}/images/uploads/site/og-image.png?v=20260504`,
    logo: `${url}/images/uploads/site/assets/androidChrome512PngFile.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trevarrian",
      addressRegion: "Cornwall",
      postalCode: "TR8",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_LATITUDE,
      longitude: BUSINESS_LONGITUDE,
    },
    hasMap: GOOGLE_BUSINESS_PROFILE_URL,
    areaServed: areaServed.map(areaToSchema),
    serviceType: [
      "Lawn Mowing",
      "Hedge Trimming",
      "Garden Maintenance",
      "Landscaping",
      "Garden Cleanup",
      "Weed Control",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone,
      email,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
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
