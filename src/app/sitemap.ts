import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// output: "export" 정적 빌드는 이 route가 빌드 시점에 고정되어야 한다.
export const dynamic = "force-static";

// 실적 상세 페이지는 noindex 처리하므로 사이트맵에도 포함하지 않는다.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
