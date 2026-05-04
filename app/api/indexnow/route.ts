import { NextResponse } from "next/server";
import { listServiceSlugs, listProjectSlugs } from "@/lib/keystatic-reader";
import { areas } from "@/lib/areas/data";

const SITE_URL = "https://quilliamsmowing.co.uk";
const INDEXNOW_KEY = "6aa67e76d1540f4f36f507f3702f677c";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.INDEXNOW_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const serviceSlugs = await listServiceSlugs();
  const projectSlugs = await listProjectSlugs();
  const areaSlugs = Object.keys(areas);

  const urls = [
    SITE_URL,
    `${SITE_URL}/services`,
    `${SITE_URL}/projects`,
    `${SITE_URL}/pricing`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/quote`,
    `${SITE_URL}/about`,
    `${SITE_URL}/areas`,
    ...serviceSlugs.map((s) => `${SITE_URL}/services/${s}`),
    ...projectSlugs.map((s) => `${SITE_URL}/projects/${s}`),
    ...areaSlugs.map((s) => `${SITE_URL}/areas/${s}`),
  ];

  const body = {
    host: "quilliamsmowing.co.uk",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({
    status: response.status,
    urlCount: urls.length,
    message: response.ok ? "IndexNow ping sent successfully" : "IndexNow ping failed",
  });
}
