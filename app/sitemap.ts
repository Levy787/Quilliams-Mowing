import { MetadataRoute } from "next";
import { listServiceSlugs, listProjectSlugs } from "@/lib/keystatic-reader";
import { areas } from "@/lib/areas/data";

const BASE_URL = "https://quilliamsmowing.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceSlugs = await listServiceSlugs();
  const projectSlugs = await listProjectSlugs();
  const areaSlugs = Object.keys(areas);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
    },
    {
      url: `${BASE_URL}/services`,
    },
    {
      url: `${BASE_URL}/projects`,
    },
    {
      url: `${BASE_URL}/pricing`,
    },
    {
      url: `${BASE_URL}/contact`,
    },
    {
      url: `${BASE_URL}/quote`,
    },
    {
      url: `${BASE_URL}/about`,
    },
    {
      url: `${BASE_URL}/areas`,
    },
    {
      url: `${BASE_URL}/blog`,
    },
    {
      url: `${BASE_URL}/blog/best-gardeners-newquay`,
    },
    {
      url: `${BASE_URL}/site-map`,
    },
    {
      url: `${BASE_URL}/refer`,
    },
    {
      url: `${BASE_URL}/privacy`,
    },
    {
      url: `${BASE_URL}/terms`,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
  }));

  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
  }));

  const areaPages: MetadataRoute.Sitemap = areaSlugs.map((slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
  }));

  return [...staticPages, ...servicePages, ...projectPages, ...areaPages];
}
