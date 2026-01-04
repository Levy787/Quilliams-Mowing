import { promises as fs } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const contentDir = path.join(repoRoot, "content");
const outFile = path.join(repoRoot, "public", "search-index.json");

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function collectStrings(value, limits = { maxDepth: 6, maxStrings: 400, maxTotalChars: 20000 }) {
  const out = [];
  const seen = new Set();
  let totalChars = 0;

  function pushString(text) {
    const trimmed = String(text).trim();
    if (!trimmed) return;
    if (out.length >= limits.maxStrings) return;
    if (totalChars >= limits.maxTotalChars) return;

    const next =
      totalChars + trimmed.length > limits.maxTotalChars
        ? trimmed.slice(0, Math.max(0, limits.maxTotalChars - totalChars))
        : trimmed;

    if (!next) return;
    out.push(next);
    totalChars += next.length;
  }

  function visit(node, depth) {
    if (node == null) return;
    if (out.length >= limits.maxStrings) return;
    if (totalChars >= limits.maxTotalChars) return;
    if (depth > limits.maxDepth) return;

    if (typeof node === "string") {
      pushString(node);
      return;
    }

    if (typeof node === "number" || typeof node === "boolean") return;

    if (Array.isArray(node)) {
      for (const item of node) visit(item, depth + 1);
      return;
    }

    if (typeof node === "object") {
      if (seen.has(node)) return;
      seen.add(node);
      for (const v of Object.values(node)) visit(v, depth + 1);
    }
  }

  visit(value, 0);
  return out;
}

function guessSnippet(entry) {
  if (!entry || typeof entry !== "object") return undefined;
  const root = entry;

  const seo = root.seo && typeof root.seo === "object" ? root.seo : null;
  const header = root.header && typeof root.header === "object" ? root.header : null;
  const hero = root.hero && typeof root.hero === "object" ? root.hero : null;

  return (
    (seo && typeof seo.description === "string" ? seo.description : undefined) ||
    (header && typeof header.description === "string" ? header.description : undefined) ||
    (hero && typeof hero.description === "string" ? hero.description : undefined) ||
    (hero && typeof hero.subheading === "string" ? hero.subheading : undefined) ||
    (hero && typeof hero.subtitle === "string" ? hero.subtitle : undefined) ||
    (hero && typeof hero.heading === "string" ? hero.heading : undefined) ||
    undefined
  );
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function listJsonFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...(await listJsonFiles(full)));
    } else if (ent.isFile() && ent.name.endsWith(".json")) {
      out.push(full);
    }
  }
  return out;
}

function toSlugFromFile(filePath) {
  return path.basename(filePath, ".json");
}

function makeDoc({ title, href, type, snippet }, payloadStrings) {
  const haystack = normalize([title, href, ...(payloadStrings || [])].filter(Boolean).join(" | "));
  return { title, href, type, snippet, haystack, priority: priorityFor({ href, type }) };
}

function priorityFor({ href, type }) {
  // Highest: conversion-oriented pages
  if (href === "/contact" || href === "/quote") return 90;

  // Next: project pages (including landing)
  if (type === "project" || href === "/projects" || href.startsWith("/projects/")) return 80;

  // Next: service pages (including landing)
  if (type === "service" || href === "/services" || href.startsWith("/services/")) return 70;

  // Offers: treat as general marketing pages (below services/projects)
  if (type === "offer") return 60;

  // Other pages
  if (href === "/") return 0;
  return 50;
}

async function main() {
  const docs = [];

  // Core pages (known filenames)
  const core = [
    { file: "home.json", title: "Home", href: "/", type: "page" },
    { file: "about.json", title: "About", href: "/about", type: "page" },
    { file: "pricing.json", title: "Pricing", href: "/pricing", type: "page" },
    { file: "services-landing.json", title: "Services", href: "/services", type: "page" },
    { file: "projects-landing.json", title: "Projects", href: "/projects", type: "page" },
    { file: "contact.json", title: "Contact", href: "/contact", type: "page" },
    { file: "quote.json", title: "Get a Quote", href: "/quote", type: "page" },
    { file: "privacy.json", title: "Privacy Policy", href: "/privacy", type: "page" },
    { file: "terms.json", title: "Terms & Conditions", href: "/terms", type: "page" },
  ];

  for (const item of core) {
    const filePath = path.join(contentDir, item.file);
    try {
      const json = await readJson(filePath);
      docs.push(
        makeDoc(
          { ...item, snippet: guessSnippet(json) },
          collectStrings(json),
        ),
      );
    } catch {
      // If a page file is missing, skip it.
    }
  }

  // Services
  const servicesDir = path.join(contentDir, "services");
  try {
    const serviceFiles = await listJsonFiles(servicesDir);
    for (const filePath of serviceFiles) {
      const json = await readJson(filePath);
      const slug = (typeof json.slug === "string" && json.slug.trim()) ? json.slug.trim() : toSlugFromFile(filePath);
      const title = (typeof json.title === "string" && json.title.trim())
        ? json.title.trim()
        : (typeof json.label === "string" && json.label.trim())
          ? json.label.trim()
          : slug;
      const snippet = (typeof json.description === "string" && json.description.trim()) ? json.description.trim() : guessSnippet(json);

      docs.push(makeDoc({ title, href: `/services/${slug}`, type: "service", snippet }, collectStrings(json)));
    }
  } catch {
    // ignore
  }

  // Projects
  const projectsDir = path.join(contentDir, "projects");
  try {
    const projectFiles = await listJsonFiles(projectsDir);
    for (const filePath of projectFiles) {
      const json = await readJson(filePath);
      const slug = (typeof json.slug === "string" && json.slug.trim()) ? json.slug.trim() : toSlugFromFile(filePath);
      const title = (typeof json.title === "string" && json.title.trim()) ? json.title.trim() : slug;
      const snippet =
        (typeof json.subtitle === "string" && json.subtitle.trim())
          ? json.subtitle.trim()
          : (typeof json.locationLabel === "string" && json.locationLabel.trim())
            ? json.locationLabel.trim()
            : guessSnippet(json);

      docs.push(makeDoc({ title, href: `/projects/${slug}`, type: "project", snippet }, collectStrings(json)));
    }
  } catch {
    // ignore
  }

  // Offers
  const offersDir = path.join(contentDir, "offers");
  try {
    const offerFiles = await listJsonFiles(offersDir);
    for (const filePath of offerFiles) {
      const json = await readJson(filePath);
      const slug = (typeof json.slug === "string" && json.slug.trim()) ? json.slug.trim() : toSlugFromFile(filePath);
      const title = (typeof json.headline === "string" && json.headline.trim()) ? json.headline.trim() : slug;
      const snippet = (typeof json.subheadline === "string" && json.subheadline.trim()) ? json.subheadline.trim() : guessSnippet(json);

      docs.push(makeDoc({ title, href: `/${slug}`, type: "offer", snippet }, collectStrings(json)));
    }
  } catch {
    // ignore
  }

  docs.sort((a, b) => {
    const pa = typeof a.priority === "number" ? a.priority : 0;
    const pb = typeof b.priority === "number" ? b.priority : 0;
    if (pa !== pb) return pb - pa;
    return a.title.localeCompare(b.title);
  });

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), docs }, null, 2) + "\n", "utf8");

  console.log(`[search-index] wrote ${docs.length} docs -> ${path.relative(repoRoot, outFile)}`);
}

main().catch((err) => {
  console.error("[search-index] failed", err);
  process.exitCode = 1;
});
