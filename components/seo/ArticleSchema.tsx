export type ArticleSchemaProps = {
  id: string;
  headline: string;
  description: string;
  images: readonly string[];
  datePublished: string;
  dateModified: string;
  pageUrl: string;
  articleSection?: string;
  wordCount?: number;
  about?: readonly string[];
  isBlogPost?: boolean;
};

function absoluteUrl(value: string): string {
  if (value.startsWith("http")) return value;
  return `https://quilliamsmowing.co.uk${value.startsWith("/") ? "" : "/"}${value}`;
}

export function ArticleSchema({
  id,
  headline,
  description,
  images,
  datePublished,
  dateModified,
  pageUrl,
  articleSection,
  wordCount,
  about = [],
  isBlogPost = false,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": isBlogPost ? ["Article", "BlogPosting"] : "Article",
    "@id": id,
    headline,
    description,
    image: images.map(absoluteUrl),
    datePublished,
    dateModified,
    inLanguage: "en-GB",
    ...(articleSection ? { articleSection } : {}),
    ...(wordCount ? { wordCount } : {}),
    author: {
      "@id": "https://quilliamsmowing.co.uk/about#levi",
    },
    publisher: {
      "@id": "https://quilliamsmowing.co.uk/#business",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    ...(about.length ? { about } : {}),
    mentions: [
      {
        "@id": "https://quilliamsmowing.co.uk/#business",
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
