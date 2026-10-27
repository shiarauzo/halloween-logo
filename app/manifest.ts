import type { MetadataRoute } from "next";
import { DESCRIPTION, SITE_NAME } from "@/lib/copy";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ee",
    theme_color: "#f6f3ee",
    lang: "es",
  };
}
