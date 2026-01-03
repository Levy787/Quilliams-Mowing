import { collection, config, fields, singleton } from "@keystatic/core";

const headlineToneOptions = [
  { label: "Normal", value: "normal" },
  { label: "Primary", value: "primary" },
  { label: "Muted", value: "muted" },
] as const;

type IconOption = { label: string; value: string };

const statIconOptions = [
  { label: "Trees", value: "trees" },
  { label: "Hard Hat", value: "hardHat" },
  { label: "Award", value: "award" },
  { label: "Tree Pine", value: "treePine" },
] as const satisfies readonly IconOption[];

const aboutFeatureIconOptions = [
  { label: "Star", value: "star" },
  { label: "Thumbs Up", value: "thumbsUp" },
  { label: "Shield Check", value: "shieldCheck" },
] as const satisfies readonly IconOption[];

const serviceIconOptions = [
  { label: "Leaf", value: "leaf" },
  { label: "Sprout", value: "sprout" },
  { label: "Snowflake", value: "snowflake" },
  { label: "Droplets", value: "droplets" },
] as const satisfies readonly IconOption[];

const serviceDetailIconOptions = [
  { label: "Leaf", value: "Leaf" },
  { label: "Ruler", value: "Ruler" },
  { label: "Sprout", value: "Sprout" },
  { label: "Trash2", value: "Trash2" },
  { label: "CalendarDays", value: "CalendarDays" },
  { label: "CloudRain", value: "CloudRain" },
  { label: "Brush", value: "Brush" },
  { label: "Flower2", value: "Flower2" },
  { label: "Layers", value: "Layers" },
  { label: "Shovel", value: "Shovel" },
  { label: "Sparkles", value: "Sparkles" },
] as const satisfies readonly IconOption[];

const serviceCardIconOptions = [
  { label: "Trees", value: "Trees" },
  { label: "Sprout", value: "Sprout" },
  { label: "Flower2", value: "Flower2" },
  { label: "Scissors", value: "Scissors" },
  { label: "Layers", value: "Layers" },
  { label: "Wind", value: "Wind" },
  { label: "Droplets", value: "Droplets" },
] as const satisfies readonly IconOption[];

const servicesLandingProcessIconOptions = [
  { label: "MessageCircle", value: "MessageCircle" },
  { label: "Lightbulb", value: "Lightbulb" },
  { label: "ClipboardCheck", value: "ClipboardCheck" },
  { label: "CalendarDays", value: "CalendarDays" },
] as const satisfies readonly IconOption[];

const aboutStoryHighlightIconOptions = [
  { label: "Leaf", value: "Leaf" },
  { label: "Sparkles", value: "Sparkles" },
  { label: "ShieldCheck", value: "ShieldCheck" },
] as const satisfies readonly IconOption[];

const aboutProcessIconOptions = [
  { label: "BadgeCheck", value: "BadgeCheck" },
  { label: "Wand2", value: "Wand2" },
  { label: "Sparkles", value: "Sparkles" },
] as const satisfies readonly IconOption[];

const servicePatternOptions = [
  { label: "Pattern 1", value: "pattern-1" },
  { label: "Pattern 2", value: "pattern-2" },
] as const;

const projectPatternOptions = servicePatternOptions;

const seoFields = () =>
  fields.object(
    {
      title: fields.text({ label: "Title" }),
      description: fields.text({ label: "Description", multiline: true }),
      ogTitle: fields.text({ label: "OG title" }),
      ogDescription: fields.text({ label: "OG description", multiline: true }),
      ogImage: fields.url({ label: "OG image URL" }),
    },
    { label: "SEO" },
  );

type ImageFieldKeys = {
  fileKey?: string;
  srcKey?: string;
  altKey?: string;
  descriptionKey?: string;
};

function imageFields(
  {
    label = "Image",
    directory = "public/images/uploads",
    keys,
    includeDescription = true,
  }: {
    label?: string;
    directory?: string;
    keys?: ImageFieldKeys;
    includeDescription?: boolean;
  } = {},
) {
  const fileKey = keys?.fileKey ?? "file";
  const srcKey = keys?.srcKey ?? "src";
  const altKey = keys?.altKey ?? "alt";
  const descriptionKey = keys?.descriptionKey ?? "description";

  return {
    [fileKey]: fields.image({ label: `${label} file`, directory }),
    [srcKey]: fields.text({ label: `${label} src (legacy/manual)` }),
    [altKey]: fields.text({ label: `${label} alt` }),
    ...(includeDescription
      ? {
        [descriptionKey]: fields.text({
          label: `${label} description`,
          multiline: true,
        }),
      }
      : {}),
  };
}

function urlImageFields(
  {
    label = "Image",
    keys,
    includeDescription = true,
    isRequired = false,
  }: {
    label?: string;
    keys?: Omit<ImageFieldKeys, "fileKey">;
    includeDescription?: boolean;
    isRequired?: boolean;
  } = {},
) {
  const srcKey = keys?.srcKey ?? "src";
  const altKey = keys?.altKey ?? "alt";
  const descriptionKey = keys?.descriptionKey ?? "description";

  const srcField = isRequired
    ? fields.url({ label: `${label} URL`, validation: { isRequired: true } })
    : fields.url({ label: `${label} URL` });

  return {
    [srcKey]: srcField,
    [altKey]: fields.text({ label: `${label} alt` }),
    ...(includeDescription
      ? {
        [descriptionKey]: fields.text({
          label: `${label} description`,
          multiline: true,
        }),
      }
      : {}),
  };
}

export const keystaticConfig = config({
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Name",
            validation: { isRequired: true },
          },
          slug: {
            label: "Slug",
          },
        }),

        order: fields.number({
          label: "Order",
          validation: { isRequired: true },
        }),

        title: fields.text({ label: "Title" }),
        subtitle: fields.text({ label: "Subtitle", multiline: true }),
        locationLabel: fields.text({ label: "Location label" }),

        template: fields.select({
          label: "Template",
          options: [
            { label: "Image hero", value: "image" },
            { label: "Video hero", value: "video" },
          ] as const,
          defaultValue: "image",
        }),

        seo: seoFields(),

        hero: fields.object(
          {
            ...imageFields({
              label: "Hero image",
              keys: {
                fileKey: "imageFile",
                srcKey: "imageSrc",
                altKey: "imageAlt",
              },
              includeDescription: false,
            }),
            pattern: fields.select({
              label: "Pattern",
              options: projectPatternOptions,
              defaultValue: "pattern-1",
            }),
          },
          { label: "Hero" },
        ),

        heroVideo: fields.object(
          {
            videoSrc: fields.url({ label: "Hero video URL" }),
            poster: fields.object(
              {
                ...imageFields({
                  label: "Poster image",
                  keys: {
                    fileKey: "posterFile",
                    srcKey: "posterSrc",
                    altKey: "posterAlt",
                  },
                  includeDescription: false,
                }),
              },
              { label: "Poster" },
            ),
          },
          { label: "Hero video" },
        ),

        chips: fields.array(fields.text({ label: "Chip" }), {
          label: "Chips",
        }),

        overview: fields.object(
          {
            label: fields.text({ label: "Label" }),
            paragraphs: fields.array(
              fields.text({ label: "Paragraph", multiline: true }),
              { label: "Paragraphs" },
            ),
          },
          { label: "Overview" },
        ),

        whatWeDid: fields.object(
          {
            label: fields.text({ label: "Label" }),
            bullets: fields.array(fields.text({ label: "Bullet" }), {
              label: "Bullets",
            }),
          },
          { label: "What we did" },
        ),

        result: fields.object(
          {
            label: fields.text({ label: "Label" }),
            bullets: fields.array(fields.text({ label: "Bullet" }), {
              label: "Bullets",
            }),
          },
          { label: "Result" },
        ),

        gallery: fields.array(
          fields.object({
            ...imageFields({
              label: "Gallery image",
              keys: {
                fileKey: "imageFile",
                srcKey: "imageSrc",
                altKey: "imageAlt",
                descriptionKey: "caption",
              },
            }),
          }),
          { label: "Gallery" },
        ),

        faq: fields.array(
          fields.object({
            id: fields.text({ label: "ID" }),
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQ" },
        ),

        ctas: fields.object(
          {
            primaryText: fields.text({ label: "Primary text" }),
            primaryHref: fields.text({ label: "Primary href" }),
            secondaryText: fields.text({ label: "Secondary text" }),
            secondaryHref: fields.text({ label: "Secondary href" }),
          },
          { label: "CTAs" },
        ),
      },
    }),
    offers: collection({
      label: "Offers",
      path: "content/offers/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Name",
            validation: { isRequired: true },
          },
          slug: {
            label: "Slug",
          },
        }),
        template: fields.select({
          label: "Template",
          options: [
            { label: "Standard", value: "standard" },
            { label: "Funnel", value: "funnel" },
          ] as const,
          defaultValue: "standard",
        }),

        headline: fields.text({ label: "Headline" }),
        subheadline: fields.text({ label: "Subheadline", multiline: true }),

        seo: seoFields(),

        terms: fields.text({ label: "Terms" }),
        serviceArea: fields.text({ label: "Service area" }),
        phoneDisplay: fields.text({ label: "Phone (display)" }),
        phoneTel: fields.text({ label: "Phone (tel:)" }),
        email: fields.text({ label: "Email" }),

        heroImage: fields.object(
          {
            ...urlImageFields({
              label: "Hero image",
              keys: { srcKey: "src", altKey: "alt" },
              includeDescription: false,
              isRequired: true,
            }),
          },
          { label: "Hero image" },
        ),

        highlights: fields.array(fields.text({ label: "Highlight" }), {
          label: "Highlights",
        }),

        trustStrip: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            icon: fields.select({
              label: "Icon",
              options: [
                { label: "Shield", value: "shield" },
                { label: "Star", value: "star" },
                { label: "Clock", value: "clock" },
                { label: "Sparkles", value: "sparkles" },
              ] as const,
              defaultValue: "shield",
            }),
          }),
          { label: "Trust strip" },
        ),

        included: fields.array(fields.text({ label: "Included item" }), {
          label: "Included",
        }),
        idealFor: fields.array(fields.text({ label: "Ideal for item" }), {
          label: "Ideal for",
        }),
        typicalTimeline: fields.text({
          label: "Typical timeline",
          multiline: true,
        }),

        faq: fields.array(
          fields.object({
            q: fields.text({ label: "Question" }),
            a: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQ" },
        ),
      },
    }),

    services: collection({
      label: "Services",
      path: "content/services/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Name",
            validation: { isRequired: true },
          },
          slug: {
            label: "Slug",
          },
        }),

        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),

        seo: seoFields(),

        cardTag: fields.text({ label: "Card tag" }),
        cardIcon: fields.select({
          label: "Card icon",
          options: serviceCardIconOptions,
          defaultValue: "Sprout",
        }),

        hero: fields.object(
          {
            ...imageFields({
              label: "Hero image",
              keys: {
                fileKey: "imageFile",
                srcKey: "imageSrc",
                altKey: "imageAlt",
                descriptionKey: "caption",
              },
            }),
            pattern: fields.select({
              label: "Pattern",
              options: servicePatternOptions,
              defaultValue: "pattern-1",
            }),
          },
          { label: "Hero" },
        ),

        trustChips: fields.array(fields.text({ label: "Chip" }), {
          label: "Trust chips",
        }),

        ctas: fields.object(
          {
            primaryText: fields.text({ label: "Primary text" }),
            primaryHref: fields.text({ label: "Primary href" }),
            secondaryText: fields.text({ label: "Secondary text" }),
            secondaryHref: fields.text({ label: "Secondary href" }),
          },
          { label: "CTAs" },
        ),

        included: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                icon: fields.select({
                  label: "Icon",
                  options: serviceDetailIconOptions,
                  defaultValue: "Leaf",
                }),
              }),
              { label: "Items" },
            ),
          },
          { label: "What's included" },
        ),

        plans: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            cards: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                bullets: fields.array(fields.text({ label: "Bullet" }), {
                  label: "Bullets",
                }),
                icon: fields.select({
                  label: "Icon",
                  options: serviceDetailIconOptions,
                  defaultValue: "Leaf",
                }),
              }),
              { label: "Cards" },
            ),
            ctas: fields.object(
              {
                primaryText: fields.text({ label: "Primary text" }),
                primaryHref: fields.text({ label: "Primary href" }),
                secondaryText: fields.text({ label: "Secondary text" }),
                secondaryHref: fields.text({ label: "Secondary href" }),
              },
              { label: "CTAs" },
            ),
          },
          { label: "Plans" },
        ),

        results: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            headerCtas: fields.object(
              {
                primaryText: fields.text({ label: "Primary text" }),
                primaryHref: fields.text({ label: "Primary href" }),
                secondaryText: fields.text({ label: "Secondary text" }),
                secondaryHref: fields.text({ label: "Secondary href" }),
              },
              { label: "Header CTAs" },
            ),
            cards: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                ...imageFields({
                  label: "Card image",
                  keys: {
                    fileKey: "imageFile",
                    srcKey: "imageSrc",
                    altKey: "imageAlt",
                  },
                  includeDescription: false,
                }),
                ctaText: fields.text({ label: "CTA text" }),
                ctaHref: fields.text({ label: "CTA href" }),
              }),
              { label: "Cards" },
            ),
            footerNote: fields.text({ label: "Footer note", multiline: true }),
          },
          { label: "Results" },
        ),

        valueBand: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            bullets: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                icon: fields.select({
                  label: "Icon",
                  options: serviceDetailIconOptions,
                  defaultValue: "Leaf",
                }),
              }),
              { label: "Bullets" },
            ),
            pattern: fields.select({
              label: "Pattern",
              options: servicePatternOptions,
              defaultValue: "pattern-2",
            }),
            ctas: fields.object(
              {
                primaryText: fields.text({ label: "Primary text" }),
                primaryHref: fields.text({ label: "Primary href" }),
                secondaryText: fields.text({ label: "Secondary text" }),
                secondaryHref: fields.text({ label: "Secondary href" }),
              },
              { label: "CTAs" },
            ),
          },
          { label: "Value band" },
        ),

        faq: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: "ID" }),
                question: fields.text({ label: "Question" }),
                answer: fields.text({ label: "Answer", multiline: true }),
              }),
              { label: "Items" },
            ),
          },
          { label: "FAQ" },
        ),

        finalCta: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            primaryText: fields.text({ label: "Primary text" }),
            primaryHref: fields.text({ label: "Primary href" }),
            secondaryText: fields.text({ label: "Secondary text" }),
            secondaryHref: fields.text({ label: "Secondary href" }),
          },
          { label: "Final CTA" },
        ),
      },
    }),
  },
  singletons: {
    projectsLanding: singleton({
      label: "Projects Landing",
      path: "content/projects-landing",
      format: "json",
      schema: {
        seo: seoFields(),

        hero: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            primaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Primary CTA" },
            ),
            secondaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Secondary CTA" },
            ),
            chips: fields.array(fields.text({ label: "Chip" }), {
              label: "Chips",
            }),
            image: fields.object(
              {
                ...imageFields({
                  label: "Hero image",
                  keys: {
                    fileKey: "file",
                    srcKey: "src",
                    altKey: "alt",
                    descriptionKey: "caption",
                  },
                }),
              },
              { label: "Hero image" },
            ),
          },
          { label: "Hero" },
        ),

        featured: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            featuredSlugs: fields.array(fields.text({ label: "Slug" }), {
              label: "Featured project slugs",
            }),
          },
          { label: "Featured" },
        ),

        allProjects: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          },
          { label: "All projects" },
        ),

        finalCta: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            primaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Primary CTA" },
            ),
            secondaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Secondary CTA" },
            ),
          },
          { label: "Final CTA" },
        ),
      },
    }),
    about: singleton({
      label: "About",
      path: "content/about",
      format: "json",
      schema: {
        seo: seoFields(),

        hero: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            headline: fields.text({ label: "Headline" }),
            subheading: fields.text({ label: "Subheading", multiline: true }),
            features: fields.array(
              fields.object({
                strong: fields.text({ label: "Strong" }),
                text: fields.text({ label: "Text", multiline: true }),
              }),
              { label: "Features" },
            ),
            ctas: fields.object(
              {
                primary: fields.object(
                  {
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Href" }),
                  },
                  { label: "Primary" },
                ),
                secondary: fields.object(
                  {
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Href" }),
                  },
                  { label: "Secondary" },
                ),
                phone: fields.object(
                  {
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Href" }),
                  },
                  { label: "Phone" },
                ),
              },
              { label: "CTAs" },
            ),
            footnote: fields.text({ label: "Footnote" }),
            image: fields.object(
              {
                ...imageFields({
                  label: "Hero image",
                  keys: {
                    fileKey: "imageFile",
                    srcKey: "imageSrc",
                    altKey: "imageAlt",
                  },
                  includeDescription: false,
                }),
              },
              { label: "Image" },
            ),
          },
          { label: "Hero" },
        ),

        story: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            paragraphs: fields.array(
              fields.text({ label: "Paragraph", multiline: true }),
              { label: "Paragraphs" },
            ),
            highlights: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                icon: fields.select({
                  label: "Icon",
                  options: aboutStoryHighlightIconOptions,
                  defaultValue: "Leaf",
                }),
              }),
              { label: "Highlights" },
            ),
            expect: fields.object(
              {
                title: fields.text({ label: "Title" }),
                items: fields.array(
                  fields.object({
                    strong: fields.text({ label: "Strong" }),
                    text: fields.text({ label: "Text", multiline: true }),
                  }),
                  { label: "Items" },
                ),
              },
              { label: "What you can expect" },
            ),
            goal: fields.object(
              {
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
              },
              { label: "Goal" },
            ),
            image: fields.object(
              {
                ...imageFields({
                  label: "Story image",
                  keys: {
                    fileKey: "imageFile",
                    srcKey: "imageSrc",
                    altKey: "imageAlt",
                  },
                  includeDescription: false,
                }),
              },
              { label: "Image" },
            ),
          },
          { label: "Story" },
        ),

        timeline: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            pillText: fields.text({ label: "Pill text" }),
            items: fields.array(
              fields.object({
                tag: fields.text({ label: "Tag" }),
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
              }),
              { label: "Items" },
            ),
          },
          { label: "Timeline" },
        ),

        process: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            ctas: fields.object(
              {
                primary: fields.object(
                  {
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Href" }),
                  },
                  { label: "Primary" },
                ),
                secondary: fields.object(
                  {
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Href" }),
                  },
                  { label: "Secondary" },
                ),
              },
              { label: "CTAs" },
            ),
            steps: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                icon: fields.select({
                  label: "Icon",
                  options: aboutProcessIconOptions,
                  defaultValue: "BadgeCheck",
                }),
              }),
              { label: "Steps" },
            ),
          },
          { label: "Process" },
        ),

        faq: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: "ID" }),
                question: fields.text({ label: "Question" }),
                answer: fields.text({ label: "Answer", multiline: true }),
              }),
              { label: "Items" },
            ),
          },
          { label: "FAQ" },
        ),
      },
    }),
    servicesLanding: singleton({
      label: "Services Landing",
      path: "content/services-landing",
      format: "json",
      schema: {
        seo: seoFields(),

        hero: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            primaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Primary CTA" },
            ),
            secondaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Secondary CTA" },
            ),
            chips: fields.array(fields.text({ label: "Chip" }), {
              label: "Chips",
            }),
            image: fields.object(
              {
                ...imageFields({
                  label: "Hero image",
                  keys: {
                    fileKey: "file",
                    srcKey: "src",
                    altKey: "alt",
                    descriptionKey: "caption",
                  },
                }),
              },
              { label: "Hero image" },
            ),
          },
          { label: "Hero" },
        ),

        process: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            steps: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                icon: fields.select({
                  label: "Icon",
                  options: servicesLandingProcessIconOptions,
                  defaultValue: "MessageCircle",
                }),
              }),
              { label: "Steps" },
            ),
          },
          { label: "Process" },
        ),

        servicesGrid: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          },
          { label: "Services grid" },
        ),

        highlights: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            items: fields.array(
              fields.object({
                image: fields.object(
                  {
                    ...imageFields({
                      label: "Highlight image",
                      keys: {
                        fileKey: "file",
                        srcKey: "src",
                        altKey: "alt",
                      },
                      includeDescription: false,
                    }),
                  },
                  { label: "Image" },
                ),
                title: fields.text({ label: "Title" }),
                bullets: fields.array(fields.text({ label: "Bullet" }), {
                  label: "Bullets",
                }),
                cta: fields.object(
                  {
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Href" }),
                    variant: fields.select({
                      label: "Variant",
                      options: [
                        { label: "Default", value: "default" },
                        { label: "Outline", value: "outline" },
                      ] as const,
                      defaultValue: "default",
                    }),
                  },
                  { label: "CTA" },
                ),
              }),
              { label: "Highlights" },
            ),
          },
          { label: "Highlights" },
        ),

        faq: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: "ID" }),
                question: fields.text({ label: "Question" }),
                answer: fields.text({ label: "Answer", multiline: true }),
              }),
              { label: "FAQ items" },
            ),
          },
          { label: "FAQ" },
        ),

        finalCta: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            primaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Primary CTA" },
            ),
            secondaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Href" }),
              },
              { label: "Secondary CTA" },
            ),
          },
          { label: "Final CTA" },
        ),
      },
    }),
    home: singleton({
      label: "Home",
      path: "content/home",
      format: "json",
      schema: {
        seo: seoFields(),
        hero: fields.object(
          {
            headlineParts: fields.array(
              fields.object({
                text: fields.text({ label: "Text" }),
                tone: fields.select({
                  label: "Tone",
                  options: headlineToneOptions,
                  defaultValue: "normal",
                }),
              }),
              { label: "Headline parts" },
            ),
            subheading: fields.text({ label: "Subheading", multiline: true }),
            primaryCtaLabel: fields.text({ label: "Primary CTA label" }),
            primaryCtaHref: fields.text({ label: "Primary CTA href" }),
            secondaryCtaLabel: fields.text({ label: "Secondary CTA label" }),
            secondaryCtaHref: fields.text({ label: "Secondary CTA href" }),
            imagesLeft: fields.array(
              fields.object({
                ...imageFields({
                  label: "Image",
                  keys: {
                    fileKey: "file",
                    srcKey: "src",
                    altKey: "alt",
                  },
                  includeDescription: false,
                }),
              }),
              { label: "Left column images" },
            ),
            imagesRight: fields.array(
              fields.object({
                ...imageFields({
                  label: "Image",
                  keys: {
                    fileKey: "file",
                    srcKey: "src",
                    altKey: "alt",
                  },
                  includeDescription: false,
                }),
              }),
              { label: "Right column images" },
            ),
          },
          { label: "Hero" },
        ),

        stats: fields.array(
          fields.object({
            value: fields.number({
              label: "Value",
              validation: { isRequired: true },
            }),
            suffix: fields.text({ label: "Suffix" }),
            label: fields.text({ label: "Label" }),
            icon: fields.select({
              label: "Icon",
              options: statIconOptions,
              defaultValue: "trees",
            }),
          }),
          { label: "Stats" },
        ),

        about: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            headingLines: fields.array(fields.text({ label: "Line" }), {
              label: "Heading lines",
            }),
            body: fields.text({ label: "Body", multiline: true }),
            ...imageFields({
              label: "About image",
              keys: {
                fileKey: "imageFile",
                srcKey: "imageSrc",
                altKey: "imageAlt",
                descriptionKey: "imageDescription",
              },
            }),
            features: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                icon: fields.select({
                  label: "Icon",
                  options: aboutFeatureIconOptions,
                  defaultValue: "star",
                }),
              }),
              { label: "Features" },
            ),
          },
          { label: "About" },
        ),

        services: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            ctaLabel: fields.text({ label: "CTA label" }),
            ctaHref: fields.text({ label: "CTA href" }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                ...imageFields({
                  label: "Service image",
                  keys: {
                    fileKey: "imageFile",
                    srcKey: "imageSrc",
                    altKey: "imageAlt",
                    descriptionKey: "imageDescription",
                  },
                }),
                tag: fields.text({ label: "Tag" }),
                icon: fields.select({
                  label: "Icon",
                  options: serviceIconOptions,
                  defaultValue: "leaf",
                }),
              }),
              { label: "Service items" },
            ),
          },
          { label: "Services" },
        ),

        serviceArea: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            body: fields.text({ label: "Body", multiline: true }),
            chips: fields.array(fields.text({ label: "Chip" }), {
              label: "Chips",
            }),
            primaryCtaLabel: fields.text({ label: "Primary CTA label" }),
            primaryCtaHref: fields.text({ label: "Primary CTA href" }),
            secondaryCtaLabel: fields.text({ label: "Secondary CTA label" }),
            secondaryCtaHref: fields.text({ label: "Secondary CTA href" }),
            footnote: fields.text({ label: "Footnote", multiline: true }),
            map: fields.object(
              {
                centerLat: fields.number({
                  label: "Center latitude",
                  validation: { isRequired: true },
                }),
                centerLng: fields.number({
                  label: "Center longitude",
                  validation: { isRequired: true },
                }),
                zoom: fields.number({
                  label: "Zoom",
                  validation: { isRequired: true },
                }),
                circleLat: fields.number({
                  label: "Circle latitude",
                  validation: { isRequired: true },
                }),
                circleLng: fields.number({
                  label: "Circle longitude",
                  validation: { isRequired: true },
                }),
                circleRadiusMeters: fields.number({
                  label: "Circle radius (meters)",
                  validation: { isRequired: true },
                }),
              },
              { label: "Map" },
            ),
            mapLabels: fields.array(
              fields.object({
                text: fields.text({ label: "Label" }),
                leftPercent: fields.number({
                  label: "Left (%)",
                  validation: { isRequired: true },
                }),
                topPercent: fields.number({
                  label: "Top (%)",
                  validation: { isRequired: true },
                }),
              }),
              { label: "Map labels" },
            ),
          },
          { label: "Service Area" },
        ),

        recentWorks: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            headingLines: fields.array(fields.text({ label: "Line" }), {
              label: "Heading lines",
            }),
            description: fields.text({ label: "Description", multiline: true }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                ...imageFields({
                  label: "Work image",
                  keys: {
                    fileKey: "imageFile",
                    srcKey: "imageSrc",
                    altKey: "imageAlt",
                    descriptionKey: "imageDescription",
                  },
                }),
                perfectFor: fields.text({
                  label: "Perfect for",
                  multiline: true,
                }),
                budget: fields.text({ label: "Budget" }),
                duration: fields.text({ label: "Duration" }),
              }),
              { label: "Work items" },
            ),
            ctaLabel: fields.text({ label: "CTA label" }),
            ctaHref: fields.text({ label: "CTA href" }),
          },
          { label: "Recent Works" },
        ),

        marquee: fields.object(
          {
            categories: fields.array(fields.text({ label: "Category" }), {
              label: "Categories",
            }),
          },
          { label: "Marquee" },
        ),

        faq: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            headingLines: fields.array(fields.text({ label: "Line" }), {
              label: "Heading lines",
            }),
            description: fields.text({ label: "Description", multiline: true }),
            ctaLabel: fields.text({ label: "CTA label" }),
            ctaHref: fields.text({ label: "CTA href" }),
            ...imageFields({
              label: "Decorative image",
              keys: {
                fileKey: "decorativeImageFile",
                srcKey: "decorativeImageSrc",
                altKey: "decorativeImageAlt",
                descriptionKey: "decorativeImageDescription",
              },
            }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: "ID" }),
                question: fields.text({ label: "Question" }),
                answer: fields.text({ label: "Answer", multiline: true }),
              }),
              { label: "FAQ items" },
            ),
          },
          { label: "FAQ" },
        ),

        largeCta: fields.object(
          {
            ...imageFields({
              label: "Left image",
              keys: {
                fileKey: "leftImageFile",
                srcKey: "leftImageUrl",
                altKey: "leftImageAlt",
              },
              includeDescription: false,
            }),
            ...imageFields({
              label: "Right image",
              keys: {
                fileKey: "rightImageFile",
                srcKey: "rightImageUrl",
                altKey: "rightImageAlt",
              },
              includeDescription: false,
            }),
            headingLines: fields.array(fields.text({ label: "Line" }), {
              label: "Heading lines",
            }),
            body: fields.text({ label: "Body", multiline: true }),
            ctaLabel: fields.text({ label: "CTA label" }),
            ctaHref: fields.text({ label: "CTA href" }),
          },
          { label: "Large CTA" },
        ),

        testimonials: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            description: fields.text({ label: "Description", multiline: true }),
            items: fields.array(
              fields.object({
                name: fields.text({ label: "Name" }),
                location: fields.text({ label: "Location" }),
                date: fields.text({ label: "Date" }),
                quote: fields.text({ label: "Quote", multiline: true }),
              }),
              { label: "Testimonials" },
            ),
          },
          { label: "Testimonials" },
        ),
      },
    }),

    pricing: singleton({
      label: "Pricing",
      path: "content/pricing",
      format: "json",
      schema: {
        seo: seoFields(),

        hero: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            description: fields.text({ label: "Description", multiline: true }),
            primaryCtaLabel: fields.text({ label: "Primary CTA label" }),
            primaryCtaHref: fields.text({ label: "Primary CTA href" }),
            secondaryCtaLabel: fields.text({ label: "Secondary CTA label" }),
            secondaryCtaHref: fields.text({ label: "Secondary CTA href" }),
            footnote: fields.text({ label: "Footnote", multiline: true }),
            sideCardTitle: fields.text({ label: "Side card title" }),
            sideCardBody: fields.text({
              label: "Side card body",
              multiline: true,
            }),
          },
          { label: "Hero" },
        ),

        calculator: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            description: fields.text({ label: "Description", multiline: true }),

            addonSectionTitle: fields.text({ label: "Add-on section title" }),

            greenWasteTitle: fields.text({ label: "Green waste title" }),
            greenWasteDescription: fields.text({
              label: "Green waste description",
              multiline: true,
            }),
            pruningTitle: fields.text({ label: "Pruning title" }),
            pruningDescription: fields.text({
              label: "Pruning description",
              multiline: true,
            }),
            hedgeTrimTitle: fields.text({ label: "Hedge trim title" }),
            hedgeTrimDescription: fields.text({
              label: "Hedge trim description",
              multiline: true,
            }),

            estimatedRangeLabel: fields.text({
              label: "Estimated range label",
            }),
            estimatedRangeNote: fields.text({
              label: "Estimated range note",
              multiline: true,
            }),
            includesTitle: fields.text({ label: "Includes title" }),
            sendTitle: fields.text({ label: "Send title" }),
            sendDescription: fields.text({
              label: "Send description",
              multiline: true,
            }),
            sendPrimaryCtaLabel: fields.text({
              label: "Send primary CTA label",
            }),
            sendSecondaryCtaLabel: fields.text({
              label: "Send secondary CTA label",
            }),
            sendSecondaryCtaHref: fields.text({
              label: "Send secondary CTA href",
            }),
            disclaimer: fields.text({ label: "Disclaimer", multiline: true }),

            defaults: fields.object(
              {
                jobType: fields.select({
                  label: "Default job type",
                  options: [
                    { label: "Cleanup", value: "cleanup" },
                    { label: "Maintenance", value: "maintenance" },
                    { label: "Lawn care", value: "lawn" },
                    { label: "Landscaping", value: "landscaping" },
                  ] as const,
                  defaultValue: "cleanup",
                }),
                yardSize: fields.select({
                  label: "Default yard size",
                  options: [
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                  ] as const,
                  defaultValue: "medium",
                }),
                condition: fields.select({
                  label: "Default condition",
                  options: [
                    { label: "Light", value: "light" },
                    { label: "Medium", value: "medium" },
                    { label: "Heavy", value: "heavy" },
                  ] as const,
                  defaultValue: "medium",
                }),
                access: fields.select({
                  label: "Default access",
                  options: [
                    { label: "Easy", value: "easy" },
                    { label: "Normal", value: "normal" },
                    { label: "Difficult", value: "difficult" },
                  ] as const,
                  defaultValue: "normal",
                }),
                greenWaste: fields.checkbox({
                  label: "Default: green waste",
                  defaultValue: true,
                }),
                pruning: fields.checkbox({
                  label: "Default: pruning",
                  defaultValue: false,
                }),
                hedgeTrim: fields.checkbox({
                  label: "Default: hedge trim",
                  defaultValue: false,
                }),
                frequency: fields.select({
                  label: "Default frequency",
                  options: [
                    { label: "One-off", value: "one-off" },
                    { label: "Fortnightly", value: "fortnightly" },
                    { label: "Monthly", value: "monthly" },
                  ] as const,
                  defaultValue: "one-off",
                }),
              },
              { label: "Defaults" },
            ),

            config: fields.object(
              {
                baseCleanup: fields.number({
                  label: "Base: cleanup",
                  validation: { isRequired: true },
                }),
                baseMaintenance: fields.number({
                  label: "Base: maintenance",
                  validation: { isRequired: true },
                }),
                baseLawn: fields.number({
                  label: "Base: lawn",
                  validation: { isRequired: true },
                }),
                baseLandscaping: fields.number({
                  label: "Base: landscaping",
                  validation: { isRequired: true },
                }),

                sizeSmall: fields.number({
                  label: "Size multiplier: small",
                  validation: { isRequired: true },
                }),
                sizeMedium: fields.number({
                  label: "Size multiplier: medium",
                  validation: { isRequired: true },
                }),
                sizeLarge: fields.number({
                  label: "Size multiplier: large",
                  validation: { isRequired: true },
                }),

                conditionLight: fields.number({
                  label: "Condition multiplier: light",
                  validation: { isRequired: true },
                }),
                conditionMedium: fields.number({
                  label: "Condition multiplier: medium",
                  validation: { isRequired: true },
                }),
                conditionHeavy: fields.number({
                  label: "Condition multiplier: heavy",
                  validation: { isRequired: true },
                }),

                accessEasy: fields.number({
                  label: "Access multiplier: easy",
                  validation: { isRequired: true },
                }),
                accessNormal: fields.number({
                  label: "Access multiplier: normal",
                  validation: { isRequired: true },
                }),
                accessDifficult: fields.number({
                  label: "Access multiplier: difficult",
                  validation: { isRequired: true },
                }),

                addonGreenWaste: fields.number({
                  label: "Addon: green waste",
                  validation: { isRequired: true },
                }),
                addonPruning: fields.number({
                  label: "Addon: pruning",
                  validation: { isRequired: true },
                }),
                addonHedgeTrim: fields.number({
                  label: "Addon: hedge trim",
                  validation: { isRequired: true },
                }),

                rangePct: fields.number({
                  label: "Range percent (e.g. 0.2)",
                  validation: { isRequired: true },
                }),
                roundTo: fields.number({
                  label: "Round to (e.g. 10)",
                  validation: { isRequired: true },
                }),
              },
              { label: "Calculator config" },
            ),
          },
          { label: "Calculator" },
        ),

        breakdown: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            description: fields.text({ label: "Description", multiline: true }),
            drivers: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
                icon: fields.select({
                  label: "Icon",
                  options: [
                    { label: "Leaf", value: "leaf" },
                    { label: "Timer", value: "timer" },
                    { label: "Footprints", value: "footprints" },
                    { label: "Recycle", value: "recycle" },
                  ] as const,
                  defaultValue: "leaf",
                }),
              }),
              { label: "Drivers" },
            ),
            tipTitle: fields.text({ label: "Tip title" }),
            tipBody: fields.text({ label: "Tip body", multiline: true }),
          },
          { label: "Breakdown" },
        ),

        faq: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            items: fields.array(
              fields.object({
                q: fields.text({ label: "Question" }),
                a: fields.text({ label: "Answer", multiline: true }),
              }),
              { label: "FAQ items" },
            ),
          },
          { label: "FAQ" },
        ),
      },
    }),

    contact: singleton({
      label: "Contact",
      path: "content/contact",
      format: "json",
      schema: {
        seo: seoFields(),

        header: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            description: fields.text({ label: "Description", multiline: true }),
          },
          { label: "Header" },
        ),

        details: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),

            phoneLabel: fields.text({ label: "Phone label" }),
            phoneDisplay: fields.text({ label: "Phone display" }),
            phoneTel: fields.text({ label: "Phone tel" }),

            emailLabel: fields.text({ label: "Email label" }),
            emailAddress: fields.text({ label: "Email address" }),

            hoursLabel: fields.text({ label: "Hours label" }),
            hoursText: fields.text({ label: "Hours text", multiline: true }),

            serviceAreaLabel: fields.text({ label: "Service area label" }),
            serviceAreaText: fields.text({
              label: "Service area text",
              multiline: true,
            }),

            googleMapsProfileLabel: fields.text({
              label: "Google Maps profile label",
            }),
            googleMapsProfileUrl: fields.url({
              label: "Google Maps profile URL",
            }),
          },
          { label: "Contact details" },
        ),

        form: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),

            fullNameLabel: fields.text({ label: "Full name label" }),
            emailLabel: fields.text({ label: "Email label" }),
            phoneLabel: fields.text({ label: "Phone label" }),

            serviceLabel: fields.text({ label: "Service label" }),
            servicePlaceholder: fields.text({ label: "Service placeholder" }),
            services: fields.array(fields.text({ label: "Service" }), {
              label: "Services",
            }),

            messageLabel: fields.text({ label: "Message label" }),
            messagePlaceholder: fields.text({
              label: "Message placeholder",
              multiline: true,
            }),

            submittedText: fields.text({ label: "Submitted text" }),
            toastSuccess: fields.text({ label: "Toast success message" }),
            submitIdleLabel: fields.text({ label: "Submit idle label" }),
            submitLoadingLabel: fields.text({ label: "Submit loading label" }),
          },
          { label: "Form" },
        ),

        map: fields.object(
          {
            centerLat: fields.number({
              label: "Center latitude",
              validation: { isRequired: true },
            }),
            centerLng: fields.number({
              label: "Center longitude",
              validation: { isRequired: true },
            }),
            zoom: fields.number({
              label: "Zoom",
              validation: { isRequired: true },
            }),
            circleLat: fields.number({
              label: "Circle latitude",
              validation: { isRequired: true },
            }),
            circleLng: fields.number({
              label: "Circle longitude",
              validation: { isRequired: true },
            }),
            circleRadiusMeters: fields.number({
              label: "Circle radius (meters)",
              validation: { isRequired: true },
            }),
          },
          { label: "Map" },
        ),
      },
    }),

    referral: singleton({
      label: "Referral",
      path: "content/referral",
      format: "json",
      schema: {
        seo: seoFields(),

        hero: fields.object(
          {
            eyebrow: fields.text({ label: "Eyebrow" }),
            heading: fields.text({ label: "Heading" }),
            subheading: fields.text({ label: "Subheading", multiline: true }),
          },
          { label: "Hero" },
        ),

        offer: fields.object(
          {
            headline: fields.text({ label: "Headline" }),
            description: fields.text({ label: "Description", multiline: true }),
            discountPercent: fields.number({
              label: "Discount percent",
              validation: { isRequired: true },
            }),
            voucherLabel: fields.text({ label: "Voucher label" }),
            terms: fields.text({ label: "Terms", multiline: true }),
          },
          { label: "Offer" },
        ),

        services: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            value: fields.text({ label: "Value" }),
          }),
          { label: "Services" },
        ),

        formCopy: fields.object(
          {
            submitIdleLabel: fields.text({ label: "Submit idle label" }),
            submitLoadingLabel: fields.text({ label: "Submit loading label" }),
            privacyNote: fields.text({
              label: "Privacy note",
              multiline: true,
            }),
            successTitle: fields.text({ label: "Success title" }),
            successMessage: fields.text({
              label: "Success message",
              multiline: true,
            }),
            voucherCodeLabel: fields.text({ label: "Voucher code label" }),
            copyCodeLabel: fields.text({ label: "Copy code label" }),
            copiedCodeLabel: fields.text({ label: "Copied code label" }),
          },
          { label: "Form copy" },
        ),
      },
    }),

    quote: singleton({
      label: "Quote",
      path: "content/quote",
      format: "json",
      schema: {
        seo: seoFields(),

        header: fields.object(
          {
            badge: fields.text({ label: "Badge" }),
            heading: fields.text({ label: "Heading" }),
            description: fields.text({ label: "Description", multiline: true }),
          },
          { label: "Header" },
        ),

        expect: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            steps: fields.array(fields.text({ label: "Step" }), {
              label: "Steps",
            }),
            responseTimeLabel: fields.text({ label: "Response time label" }),
            responseTimeValue: fields.text({ label: "Response time value" }),
          },
          { label: "What to expect" },
        ),

        calculatorSummary: fields.object(
          {
            title: fields.text({ label: "Title" }),
            addonsLabel: fields.text({ label: "Add-ons label" }),
            note: fields.text({ label: "Note", multiline: true }),
          },
          { label: "Calculator summary" },
        ),

        form: fields.object(
          {
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),

            fullNameLabel: fields.text({ label: "Full name label" }),
            emailLabel: fields.text({ label: "Email label" }),
            phoneLabel: fields.text({ label: "Phone label" }),
            addressLabel: fields.text({ label: "Address label" }),

            serviceTypeLabel: fields.text({ label: "Service type label" }),
            serviceTypePlaceholder: fields.text({
              label: "Service type placeholder",
            }),
            serviceOptions: fields.array(fields.text({ label: "Service" }), {
              label: "Service options",
            }),

            timeframeLabel: fields.text({ label: "Timeframe label" }),
            timeframePlaceholder: fields.text({
              label: "Timeframe placeholder",
            }),
            timeframeOptions: fields.array(
              fields.text({ label: "Timeframe" }),
              {
                label: "Timeframe options",
              },
            ),

            budgetLabel: fields.text({ label: "Budget label" }),
            budgetPlaceholder: fields.text({ label: "Budget placeholder" }),
            budgetOptions: fields.array(
              fields.text({ label: "Budget option" }),
              {
                label: "Budget options",
              },
            ),

            photosLabel: fields.text({ label: "Photos label" }),
            photosHelp: fields.text({ label: "Photos help", multiline: true }),
            maxPhotosError: fields.text({ label: "Max photos error" }),
            onlyImagesError: fields.text({ label: "Only images error" }),
            largePhotosWarningPrefix: fields.text({
              label: "Large photos warning prefix",
            }),
            largePhotosWarningSuffix: fields.text({
              label: "Large photos warning suffix",
            }),
            removeImageAriaLabelPrefix: fields.text({
              label: "Remove image aria-label prefix",
            }),
            selectedPhotoAltPrefix: fields.text({
              label: "Selected photo alt prefix",
            }),

            jobDetailsLabel: fields.text({ label: "Job details label" }),
            jobDetailsPlaceholder: fields.text({
              label: "Job details placeholder",
              multiline: true,
            }),

            requiredServiceError: fields.text({
              label: "Required service error",
            }),
            submittedText: fields.text({ label: "Submitted text" }),
            toastSuccess: fields.text({ label: "Toast success" }),
            submitIdleLabel: fields.text({ label: "Submit idle label" }),
            submitLoadingLabel: fields.text({ label: "Submit loading label" }),
          },
          { label: "Form" },
        ),
      },
    }),
  },
});

export default keystaticConfig;
