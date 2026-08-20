import type { MetadataRoute } from "next";
import { getAchievements } from "@/lib/content/achievements";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = [
    "",
    "/about",
    "/technology",
    "/business",
    "/achievements",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const items = await getAchievements();
  const achievementEntries: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_URL}/achievements/${item.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...achievementEntries];
}
