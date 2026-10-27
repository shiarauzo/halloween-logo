import { SITE_NAME } from "@/lib/copy";

const PRODUCTION_FALLBACK = "https://gorro.vercel.app";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd.replace(/\/$/, "")}`;
  return PRODUCTION_FALLBACK;
}

export const SITE_URL = resolveSiteUrl();

export { SITE_NAME };
