import { achievements } from "@/content/achievements";
import type { Achievement } from "./types";

/**
 * 실적 데이터 접근 계층.
 * 시그니처를 처음부터 async(API 모양)로 고정한다. 향후 백엔드가 붙으면
 * 이 함수 내부만 fetch(API)로 교체하고 호출부는 그대로 둔다.
 */
export async function getAchievements(): Promise<Achievement[]> {
  return achievements;
}

export async function getAchievementBySlug(
  slug: string,
): Promise<Achievement | null> {
  return achievements.find((achievement) => achievement.slug === slug) ?? null;
}
