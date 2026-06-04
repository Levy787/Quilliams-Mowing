import { MetadataRoute } from "next";
import { stat } from "fs/promises";
import path from "path";

import { listBlogSlugs, listServiceSlugs, listProjectSlugs } from "@/lib/keystatic-reader";
import { areas } from "@/lib/areas/data";

const BASE_URL = "https://quilliamsmowing.co.uk";
const FALLBACK_LAST_MODIFIED = new Date("2026-05-26");

async function getLastModified(relativePaths: string[]): Promise<Date> {
  const mtimes = await Promise.all(
    relativePaths.map(async (relativePath) => {
      try {
        const fileStat = await stat(path.join(process.cwd(), relativePath));
        return fileStat.mtime;
      } catch {
        return null;
      }
    }),
  );

  return mtimes.reduce<Date>((newest, mtime) => {
    if (!mtime) return newest;
    return mtime > newest ? mtime : newest;
  }, FALLBACK_LAST_MODIFIED);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceSlugs = await listServiceSlugs();
  const projectSlugs = await listProjectSlugs();
  const blogSlugs = await listBlogSlugs();
  const areaSlugs = Object.keys(areas).filter((slug) => !areas[slug].noindex);

  const staticPageSpecs = [
    {
      url: BASE_URL,
      files: ["content/home.json", "app/(marketing)/(home)/page.tsx"],
    },
    {
      url: `${BASE_URL}/services`,
      files: ["content/services-landing.json", "app/(marketing)/services/page.tsx"],
    },
    {
      url: `${BASE_URL}/projects`,
      files: ["content/projects-landing.json", "app/(marketing)/projects/page.tsx"],
    },
    {
      url: `${BASE_URL}/pricing`,
      files: ["content/pricing.json", "app/(marketing)/pricing/page.tsx"],
    },
    {
      url: `${BASE_URL}/contact`,
      files: ["content/contact.json", "app/(marketing)/contact/page.tsx"],
    },
    {
      url: `${BASE_URL}/quote`,
      files: ["content/quote.json", "app/(marketing)/quote/page.tsx"],
    },
    {
      url: `${BASE_URL}/about`,
      files: ["content/about.json", "app/(marketing)/about/page.tsx"],
    },
    {
      url: `${BASE_URL}/areas`,
      files: ["lib/areas/data.ts", "app/(marketing)/areas/page.tsx"],
    },
    {
      url: `${BASE_URL}/blog`,
      files: ["app/(marketing)/blog/page.tsx", ...blogSlugs.map((slug) => `content/blog/${slug}.json`)],
    },
    {
      url: `${BASE_URL}/site-map`,
      files: ["app/(marketing)/site-map/page.tsx"],
    },
    {
      url: `${BASE_URL}/refer`,
      files: ["content/referral.json", "app/refer/page.tsx"],
    },
    {
      url: `${BASE_URL}/privacy`,
      files: ["content/privacy.json", "app/(marketing)/privacy/page.tsx"],
    },
    {
      url: `${BASE_URL}/terms`,
      files: ["content/terms.json", "app/(marketing)/terms/page.tsx"],
    },
  ];

  const staticPages: MetadataRoute.Sitemap = await Promise.all(
    staticPageSpecs.map(async (page) => ({
      url: page.url,
      lastModified: await getLastModified(page.files),
    })),
  );

  const servicePages: MetadataRoute.Sitemap = await Promise.all(serviceSlugs.map(async (slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: await getLastModified([
      `content/services/${slug}.json`,
      "app/(marketing)/services/[slug]/page.tsx",
    ]),
  })));

  const projectPages: MetadataRoute.Sitemap = await Promise.all(projectSlugs.map(async (slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: await getLastModified([
      `content/projects/${slug}.json`,
      "app/(marketing)/projects/[slug]/page.tsx",
    ]),
  })));

  const areaPages: MetadataRoute.Sitemap = await Promise.all(areaSlugs.map(async (slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
    lastModified: await getLastModified([
      "lib/areas/data.ts",
      "app/(marketing)/areas/[slug]/page.tsx",
    ]),
  })));

  const blogPages: MetadataRoute.Sitemap = await Promise.all(blogSlugs.map(async (slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: await getLastModified([
      `content/blog/${slug}.json`,
      "app/(marketing)/blog/[slug]/page.tsx",
    ]),
  })));

  return [...staticPages, ...servicePages, ...projectPages, ...areaPages, ...blogPages];
}
