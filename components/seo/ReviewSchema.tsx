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

export function ReviewSchema({
  businessName = "Quilliams Gardening & Landscaping",
  reviews,
}: ReviewSchemaProps) {
  if (!reviews.length) return null;

  const ratingValues = reviews.map((r) => r.ratingValue ?? 5);
  const averageRating = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
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
        bestRating: "5",
        worstRating: "1",
      },
      datePublished: review.datePublished,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
