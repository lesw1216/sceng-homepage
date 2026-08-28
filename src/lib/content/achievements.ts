import { ACHIEVEMENT_CATEGORIES } from "@/content/achievementCategories";
import { achievements } from "@/content/achievements";
import type {
  Achievement,
  AchievementCategory,
  AchievementSource,
} from "./types";

/** "2026-03" → 2026 */
function yearOf(date: string): number {
  return Number(date.slice(0, 4));
}

/** "2026-03" → "2026.03" */
function formatMonth(date: string): string {
  return date.replace("-", ".");
}

/** areaKey → ACHIEVEMENT_CATEGORIES 표시 라벨 (정의에 없는 key는 areaKey를 그대로 노출) */
function categoryLabelOf(areaKey: string): string {
  return (
    ACHIEVEMENT_CATEGORIES.find((category) => category.key === areaKey)?.label ??
    areaKey
  );
}

/** 원천 레코드 → 화면용 레코드 (year·period·category 파생) */
function toAchievement(source: AchievementSource): Achievement {
  return {
    ...source,
    year: yearOf(source.startDate),
    period: `${formatMonth(source.startDate)} ~ ${formatMonth(source.endDate)}`,
    category: categoryLabelOf(source.areaKey),
  };
}

/**
 * 정렬 규칙: 시작일 내림차순 → 종료일 내림차순 → 등록 순서 내림차순.
 * 백엔드 도입 시 이 정렬은 서버에서 처리하고 accessor는 응답 순서를 그대로 사용한다.
 */
function compareAchievements(a: Achievement, b: Achievement): number {
  if (a.startDate !== b.startDate) return a.startDate < b.startDate ? 1 : -1;
  if (a.endDate !== b.endDate) return a.endDate < b.endDate ? 1 : -1;
  return b.sequence - a.sequence;
}

/**
 * 실적 데이터 접근 계층.
 * 시그니처를 처음부터 async(API 모양)로 고정한다. 향후 백엔드가 붙으면
 * 이 함수 내부만 fetch(API)로 교체하고 호출부는 그대로 둔다.
 */
export async function getAchievements(): Promise<Achievement[]> {
  return achievements.map(toAchievement).sort(compareAchievements);
}

export async function getAchievementBySlug(
  slug: string,
): Promise<Achievement | null> {
  const found = achievements.find((achievement) => achievement.slug === slug);
  return found ? toAchievement(found) : null;
}

/** 실적이 존재하는 연도 목록 (내림차순) */
export async function getAchievementYears(): Promise<number[]> {
  const years = new Set(
    achievements.map((achievement) => yearOf(achievement.startDate)),
  );
  return [...years].sort((a, b) => b - a);
}

/**
 * 실적현황 상세 탭 선택지. 등록된 실적 유무와 무관하게 고정 목록을 그대로 반환한다
 * (해당 분야 실적이 0건이어도 탭은 노출하고, 목록은 Empty State로 안내한다).
 */
export async function getAchievementCategories(): Promise<
  AchievementCategory[]
> {
  return ACHIEVEMENT_CATEGORIES;
}
