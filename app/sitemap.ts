import type { MetadataRoute } from "next";
import { siteConfig } from "../content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.brand.domain}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
