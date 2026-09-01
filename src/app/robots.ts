import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// output: "export" 정적 빌드는 이 route가 빌드 시점에 고정되어야 한다.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
