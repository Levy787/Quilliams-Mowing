import type { MetadataRoute } from "next";

import {
  getBlogPostBySlug,
  listBlogSlugs,
  listProjectSlugs,
  listServiceSlugs,
} from "@/lib/keystatic-reader";
import { areas } from "@/lib/areas/data";

const BASE_URL = "https://quilliamsmowing.co.uk";

function reliableContentDate(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed || !/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return undefined;

  const timestamp = Date.parse(`${trimmed}T00:00:00Z`);
  return Number.isFinite(timestamp) ? trimmed : undefined;
}

function entry(
  url: string,
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  return lastModified ? { url, lastModified } : { url };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceSlugs = await listServiceSlugs();
  const projectSlugs = await listProjectSlugs();
  const blogSlugs = await listBlogSlugs();
  const areaSlugs = Object.keys(areas).filter((slug) => !areas[slug].noindex);

  const blogPosts = await Promise.all(
    blogSlugs.map(async (slug) => ({
      slug,
      post: await getBlogPostBySlug(slug),
    })),
  );

  const blogDates = blogPosts
    .map(({ post }) =>
      reliableContentDate(post?.updatedDate ?? post?.publishedDate),
    )
    .filter((date): date is string => Boolean(date));
  const latestBlogDate = blogDates.sort().at(-1);

  // Source-control mtimes are reset by fresh deployments, so they are not
  // truthful page modification dates. Omit lastmod unless the content model
  // exposes an editorial date used by the rendered Article schema.
  const staticPages: MetadataRoute.Sitemap = [
    entry(BASE_URL),
    entry(`${BASE_URL}/services`),
    entry(`${BASE_URL}/projects`),
    entry(`${BASE_URL}/pricing`),
    entry(`${BASE_URL}/contact`),
    entry(`${BASE_URL}/quote`),
    entry(`${BASE_URL}/about`),
    entry(`${BASE_URL}/areas`),
    entry(`${BASE_URL}/blog`, latestBlogDate),
    entry(`${BASE_URL}/site-map`),
    entry(`${BASE_URL}/refer`),
    entry(`${BASE_URL}/privacy`),
    entry(`${BASE_URL}/terms`),
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) =>
    entry(`${BASE_URL}/services/${slug}`),
  );

  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) =>
    entry(`${BASE_URL}/projects/${slug}`),
  );

  const areaPages: MetadataRoute.Sitemap = areaSlugs.map((slug) =>
    entry(`${BASE_URL}/areas/${slug}`),
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.map(({ slug, post }) =>
    entry(
      `${BASE_URL}/blog/${slug}`,
      reliableContentDate(post?.updatedDate ?? post?.publishedDate),
    ),
  );

  return [...staticPages, ...servicePages, ...projectPages, ...areaPages, ...blogPages];
}
