export interface Review {
  author: string;
  reviewBody: string;
  datePublished?: string;
  ratingValue?: number;
}

export interface ReviewSchemaProps {
  businessName?: string;
  reviews: Review[];
}

/**
 * Normalize human-readable dates like "20 Oct 2025" to ISO 8601 "2025-10-20".
 * Falls back to the original string if parsing fails.
 */
function toISODate(raw?: string): string | undefined {
  if (!raw) return undefined;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toISOString().split("T")[0];
}

export function ReviewSchema({
  reviews,
}: ReviewSchemaProps) {
  if (!reviews.length) return null;

  const ratingValues = reviews.map((r) => r.ratingValue ?? 5);
  const averageRating = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": "https://quilliamsmowing.co.uk/#business",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(averageRating.toFixed(1)),
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviews.length,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue ?? 5,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: toISODate(review.datePublished),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
