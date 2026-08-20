import type { MetadataRoute } from "next";
import { getAchievements } from "@/lib/content/achievements";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const items = await getAchievements();
  const achievementEntries: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_URL}/achievements/${item.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...home, ...achievementEntries];
}
