import { config, fields, singleton } from '@keystatic/core';

const headlineToneOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Primary', value: 'primary' },
  { label: 'Muted', value: 'muted' },
] as const;

type IconOption = { label: string; value: string };

const statIconOptions = [
  { label: 'Trees', value: 'trees' },
  { label: 'Hard Hat', value: 'hardHat' },
  { label: 'Award', value: 'award' },
  { label: 'Tree Pine', value: 'treePine' },
] as const satisfies readonly IconOption[];

const aboutFeatureIconOptions = [
  { label: 'Star', value: 'star' },
  { label: 'Thumbs Up', value: 'thumbsUp' },
  { label: 'Shield Check', value: 'shieldCheck' },
] as const satisfies readonly IconOption[];

const serviceIconOptions = [
  { label: 'Leaf', value: 'leaf' },
  { label: 'Sprout', value: 'sprout' },
  { label: 'Snowflake', value: 'snowflake' },
  { label: 'Droplets', value: 'droplets' },
] as const satisfies readonly IconOption[];

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    home: singleton({
      label: 'Home',
      path: 'content/home',
      format: 'json',
      schema: {
        hero: fields.object(
          {
            headlineParts: fields.array(
              fields.object({
                text: fields.text({ label: 'Text' }),
                tone: fields.select({
                  label: 'Tone',
                  options: headlineToneOptions,
                  defaultValue: 'normal',
                }),
              }),
              { label: 'Headline parts' }
            ),
            subheading: fields.text({ label: 'Subheading', multiline: true }),
            primaryCtaLabel: fields.text({ label: 'Primary CTA label' }),
            primaryCtaHref: fields.text({ label: 'Primary CTA href' }),
            secondaryCtaLabel: fields.text({ label: 'Secondary CTA label' }),
            secondaryCtaHref: fields.text({ label: 'Secondary CTA href' }),
            imagesLeft: fields.array(
              fields.object({
                src: fields.text({ label: 'Image src' }),
                alt: fields.text({ label: 'Alt text' }),
              }),
              { label: 'Left column images' }
            ),
            imagesRight: fields.array(
              fields.object({
                src: fields.text({ label: 'Image src' }),
                alt: fields.text({ label: 'Alt text' }),
              }),
              { label: 'Right column images' }
            ),
          },
          { label: 'Hero' }
        ),

        stats: fields.array(
          fields.object({
            value: fields.number({ label: 'Value', validation: { isRequired: true } }),
            suffix: fields.text({ label: 'Suffix' }),
            label: fields.text({ label: 'Label' }),
            icon: fields.select({
              label: 'Icon',
              options: statIconOptions,
              defaultValue: 'trees',
            }),
          }),
          { label: 'Stats' }
        ),

        about: fields.object(
          {
            badge: fields.text({ label: 'Badge' }),
            headingLines: fields.array(fields.text({ label: 'Line' }), {
              label: 'Heading lines',
            }),
            body: fields.text({ label: 'Body', multiline: true }),
            imageSrc: fields.text({ label: 'Image src' }),
            imageAlt: fields.text({ label: 'Image alt' }),
            features: fields.array(
              fields.object({
                title: fields.text({ label: 'Title' }),
                description: fields.text({ label: 'Description', multiline: true }),
                icon: fields.select({
                  label: 'Icon',
                  options: aboutFeatureIconOptions,
                  defaultValue: 'star',
                }),
              }),
              { label: 'Features' }
            ),
          },
          { label: 'About' }
        ),

        services: fields.object(
          {
            badge: fields.text({ label: 'Badge' }),
            heading: fields.text({ label: 'Heading' }),
            ctaLabel: fields.text({ label: 'CTA label' }),
            ctaHref: fields.text({ label: 'CTA href' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: 'Title' }),
                description: fields.text({ label: 'Description', multiline: true }),
                tag: fields.text({ label: 'Tag' }),
                icon: fields.select({
                  label: 'Icon',
                  options: serviceIconOptions,
                  defaultValue: 'leaf',
                }),
              }),
              { label: 'Service items' }
            ),
          },
          { label: 'Services' }
        ),

        serviceArea: fields.object(
          {
            badge: fields.text({ label: 'Badge' }),
            heading: fields.text({ label: 'Heading' }),
            body: fields.text({ label: 'Body', multiline: true }),
            chips: fields.array(fields.text({ label: 'Chip' }), { label: 'Chips' }),
            primaryCtaLabel: fields.text({ label: 'Primary CTA label' }),
            primaryCtaHref: fields.text({ label: 'Primary CTA href' }),
            secondaryCtaLabel: fields.text({ label: 'Secondary CTA label' }),
            secondaryCtaHref: fields.text({ label: 'Secondary CTA href' }),
            footnote: fields.text({ label: 'Footnote', multiline: true }),
            map: fields.object(
              {
                centerLat: fields.number({ label: 'Center latitude', validation: { isRequired: true } }),
                centerLng: fields.number({ label: 'Center longitude', validation: { isRequired: true } }),
                zoom: fields.number({ label: 'Zoom', validation: { isRequired: true } }),
                circleLat: fields.number({ label: 'Circle latitude', validation: { isRequired: true } }),
                circleLng: fields.number({ label: 'Circle longitude', validation: { isRequired: true } }),
                circleRadiusMeters: fields.number({
                  label: 'Circle radius (meters)',
                  validation: { isRequired: true },
                }),
              },
              { label: 'Map' }
            ),
            mapLabels: fields.array(
              fields.object({
                text: fields.text({ label: 'Label' }),
                leftPercent: fields.number({ label: 'Left (%)', validation: { isRequired: true } }),
                topPercent: fields.number({ label: 'Top (%)', validation: { isRequired: true } }),
              }),
              { label: 'Map labels' }
            ),
          },
          { label: 'Service Area' }
        ),

        recentWorks: fields.object(
          {
            badge: fields.text({ label: 'Badge' }),
            headingLines: fields.array(fields.text({ label: 'Line' }), {
              label: 'Heading lines',
            }),
            description: fields.text({ label: 'Description', multiline: true }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: 'Title' }),
                description: fields.text({ label: 'Description', multiline: true }),
                perfectFor: fields.text({ label: 'Perfect for', multiline: true }),
                budget: fields.text({ label: 'Budget' }),
                duration: fields.text({ label: 'Duration' }),
              }),
              { label: 'Work items' }
            ),
            ctaLabel: fields.text({ label: 'CTA label' }),
            ctaHref: fields.text({ label: 'CTA href' }),
          },
          { label: 'Recent Works' }
        ),

        marquee: fields.object(
          {
            categories: fields.array(fields.text({ label: 'Category' }), {
              label: 'Categories',
            }),
          },
          { label: 'Marquee' }
        ),

        faq: fields.object(
          {
            badge: fields.text({ label: 'Badge' }),
            headingLines: fields.array(fields.text({ label: 'Line' }), {
              label: 'Heading lines',
            }),
            description: fields.text({ label: 'Description', multiline: true }),
            ctaLabel: fields.text({ label: 'CTA label' }),
            ctaHref: fields.text({ label: 'CTA href' }),
            decorativeImageSrc: fields.text({ label: 'Decorative image src' }),
            decorativeImageAlt: fields.text({ label: 'Decorative image alt' }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: 'ID' }),
                question: fields.text({ label: 'Question' }),
                answer: fields.text({ label: 'Answer', multiline: true }),
              }),
              { label: 'FAQ items' }
            ),
          },
          { label: 'FAQ' }
        ),

        largeCta: fields.object(
          {
            leftImageUrl: fields.url({ label: 'Left image URL', validation: { isRequired: true } }),
            leftImageAlt: fields.text({ label: 'Left image alt' }),
            rightImageUrl: fields.url({ label: 'Right image URL', validation: { isRequired: true } }),
            rightImageAlt: fields.text({ label: 'Right image alt' }),
            headingLines: fields.array(fields.text({ label: 'Line' }), {
              label: 'Heading lines',
            }),
            body: fields.text({ label: 'Body', multiline: true }),
            ctaLabel: fields.text({ label: 'CTA label' }),
            ctaHref: fields.text({ label: 'CTA href' }),
          },
          { label: 'Large CTA' }
        ),

        testimonials: fields.object(
          {
            badge: fields.text({ label: 'Badge' }),
            heading: fields.text({ label: 'Heading' }),
            description: fields.text({ label: 'Description', multiline: true }),
            items: fields.array(
              fields.object({
                name: fields.text({ label: 'Name' }),
                location: fields.text({ label: 'Location' }),
                date: fields.text({ label: 'Date' }),
                quote: fields.text({ label: 'Quote', multiline: true }),
              }),
              { label: 'Testimonials' }
            ),
          },
          { label: 'Testimonials' }
        ),
      },
    }),
  },
});
