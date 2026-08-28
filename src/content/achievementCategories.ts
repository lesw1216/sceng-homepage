import type { AchievementCategory } from "@/lib/content/types";

/**
 * 실적현황 상세 탭(사업 분야) 고정 목록.
 * 실제로 등록된 실적 유무와 무관하게 항상 노출한다(추후 백엔드 Enum API로 교체 대상).
 * key는 businessAreas의 key와 맞춘다.
 */
export const ACHIEVEMENT_CATEGORIES: AchievementCategory[] = [
  { key: "industry-automation", label: "산업 자동화" },
  { key: "building-automation", label: "빌딩 자동화" },
  { key: "datacenter-infra", label: "데이터센터 인프라 솔루션" },
];
