import { achievements } from "@/content/achievements";
import type { Achievement } from "./types";

/**
 * 실적 데이터 접근 계층.
 * 시그니처를 처음부터 async(API 모양)로 고정한다. 향후 백엔드가 붙으면
 * 이 함수 내부만 fetch(API)로 교체하고 호출부는 그대로 둔다.
 */
export async function getAchievements(): Promise<Achievement[]> {
  return [...achievements].sort((a, b) => b.year - a.year);
}

export async function getAchievementBySlug(
  slug: string,
): Promise<Achievement | null> {
  return achievements.find((achievement) => achievement.slug === slug) ?? null;
}

/** 실적이 존재하는 연도 목록 (내림차순) */
export async function getAchievementYears(): Promise<number[]> {
  const years = new Set(achievements.map((achievement) => achievement.year));
  return [...years].sort((a, b) => b - a);
}
