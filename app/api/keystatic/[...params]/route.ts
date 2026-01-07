import { makeRouteHandler } from "@keystatic/next/route-handler";
import { keystaticConfig } from "@/keystatic.config";

// Only enable Keystatic in development
const handler =
  process.env.NODE_ENV === "development"
    ? makeRouteHandler({ config: keystaticConfig })
    : {
        GET: () => new Response("Not Found", { status: 404 }),
        POST: () => new Response("Not Found", { status: 404 }),
      };

export const { POST, GET } = handler;
