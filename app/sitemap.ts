import type { MetadataRoute } from "next";
import { siteConfig } from "../content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteConfig.brand.domain}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.brand.domain}/politica-de-privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.brand.domain}/termos-de-uso`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
