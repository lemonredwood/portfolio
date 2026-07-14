import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";

/** Single-page site: one canonical URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.href,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
