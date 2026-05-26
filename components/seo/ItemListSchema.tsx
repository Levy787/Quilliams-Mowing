export type ItemListSchemaItem = {
  name: string;
  url: string;
};

export type ItemListSchemaProps = {
  id: string;
  name: string;
  items: readonly ItemListSchemaItem[];
};

export function ItemListSchema({ id, name, items }: ItemListSchemaProps) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": id,
    name,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
