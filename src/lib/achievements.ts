import type { Achievement } from "./content/types";

/** 실적 리스트 한 페이지에 표시하는 개수 (Desktop 5열 × 2행) */
export const ACHIEVEMENTS_PER_PAGE = 10;

/** 사업 분야·연도 필터의 "제한 없음" 값 */
export const ALL_FILTER = "all";

export interface AchievementQuery {
  /** 검색 실행 시점에 확정된 검색어 (빈 문자열이면 제한 없음) */
  keyword: string;
  /** 사업 분야 key 또는 ALL_FILTER */
  areaKey: string;
  /** 연도 또는 ALL_FILTER */
  year: number | typeof ALL_FILTER;
}

/**
 * 검색어·사업 분야·연도를 AND로 결합해 필터링한다.
 * 백엔드 도입 시 동일한 query 객체를 검색 API 파라미터로 넘기고 이 함수는 제거한다.
 */
export function filterAchievements(
  items: Achievement[],
  query: AchievementQuery,
): Achievement[] {
  const keyword = query.keyword.trim().toLowerCase();

  return items.filter((item) => {
    if (query.areaKey !== ALL_FILTER && item.areaKey !== query.areaKey) {
      return false;
    }
    if (query.year !== ALL_FILTER && item.year !== query.year) return false;
    if (keyword === "") return true;

    return [item.title, item.client, item.location]
      .join(" ")
      .toLowerCase()
      .includes(keyword);
  });
}

/** 전체 페이지 수 (항목이 없어도 최소 1페이지) */
export function getTotalPages(itemCount: number): number {
  return Math.max(1, Math.ceil(itemCount / ACHIEVEMENTS_PER_PAGE));
}

/** page(1-base)에 해당하는 항목만 잘라낸다. */
export function getPageItems(
  items: Achievement[],
  page: number,
): Achievement[] {
  const start = (page - 1) * ACHIEVEMENTS_PER_PAGE;
  return items.slice(start, start + ACHIEVEMENTS_PER_PAGE);
}
