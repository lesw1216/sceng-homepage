import type { MetadataRoute } from "next";
import { getAchievements } from "@/lib/content/achievements";
import { SITE_URL } from "@/lib/site";

// output: "export" 정적 빌드는 이 route가 빌드 시점에 고정되어야 한다.
export const dynamic = "force-static";

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

  // 데모 레코드는 실제 실적이 아니므로 색인 대상에서 제외한다.
  const items = (await getAchievements()).filter((item) => !item.isDemo);
  const achievementEntries: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_URL}/achievements/${item.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...home, ...achievementEntries];
}
