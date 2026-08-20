import type { Achievement } from "@/lib/content/types";

/**
 * 실적 원천 데이터.
 * TODO: 회사 소개서(2026-08-20)에는 실적 목록이 없어 비워 둔다.
 * 실제 프로젝트 실적 자료를 받으면 아래 형식으로 채운다 (record 1건 = 게시글 1건).
 * 컴포넌트는 이 배열을 직접 import 하지 말고 @/lib/content/achievements accessor 를 경유한다.
 *
 * 예시:
 * {
 *   slug: "2024-plant-a-automation",
 *   title: "A공장 자동화 라인 구축",
 *   date: "2024-11",
 *   category: "산업 자동화",
 *   summary: "...",
 *   metrics: [{ label: "생산성", value: "+32%" }],
 *   body: "...",
 * }
 */
export const achievements: Achievement[] = [];
