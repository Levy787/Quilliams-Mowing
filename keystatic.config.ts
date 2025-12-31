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

export const keystaticConfig = config({
  storage: {
    kind: "local",
  },
  collections: {
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
        terms: fields.text({ label: "Terms" }),
        serviceArea: fields.text({ label: "Service area" }),
        phoneDisplay: fields.text({ label: "Phone (display)" }),
        phoneTel: fields.text({ label: "Phone (tel:)" }),
        email: fields.text({ label: "Email" }),

        heroImage: fields.object(
          {
            src: fields.url({
              label: "Hero image URL",
              validation: { isRequired: true },
            }),
            alt: fields.text({ label: "Hero image alt" }),
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
  },
  singletons: {
    home: singleton({
      label: "Home",
      path: "content/home",
      format: "json",
      schema: {
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
                src: fields.text({ label: "Image src" }),
                alt: fields.text({ label: "Alt text" }),
              }),
              { label: "Left column images" },
            ),
            imagesRight: fields.array(
              fields.object({
                src: fields.text({ label: "Image src" }),
                alt: fields.text({ label: "Alt text" }),
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
            imageSrc: fields.text({ label: "Image src" }),
            imageAlt: fields.text({ label: "Image alt" }),
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
            decorativeImageSrc: fields.text({ label: "Decorative image src" }),
            decorativeImageAlt: fields.text({ label: "Decorative image alt" }),
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
            leftImageUrl: fields.url({
              label: "Left image URL",
              validation: { isRequired: true },
            }),
            leftImageAlt: fields.text({ label: "Left image alt" }),
            rightImageUrl: fields.url({
              label: "Right image URL",
              validation: { isRequired: true },
            }),
            rightImageAlt: fields.text({ label: "Right image alt" }),
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
            iframeTitle: fields.text({ label: "Iframe title" }),
            iframeSrc: fields.url({
              label: "Iframe src",
              validation: { isRequired: true },
            }),
          },
          { label: "Map" },
        ),
      },
    }),

    quote: singleton({
      label: "Quote",
      path: "content/quote",
      format: "json",
      schema: {
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
