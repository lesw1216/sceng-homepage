import type { Achievement } from "@/lib/content/types";

/**
 * 실적 원천 데이터.
 * TODO: 회사 소개 자료 수신 후 실제 실적으로 교체할 placeholder 더미.
 * 컴포넌트에서 이 배열을 직접 import 하지 말 것 — @/lib/content/achievements 의
 * accessor 를 경유한다. (see .claude/rules/data-layer.md)
 */
export const achievements: Achievement[] = [
  {
    slug: "2024-plant-a-automation",
    title: "A공장 자동화 라인 구축",
    date: "2024-11",
    category: "공장 자동화",
    summary:
      "노후 수작업 공정을 전 라인 자동화로 전환해 생산성과 불량률을 동시에 개선한 프로젝트.",
    metrics: [
      { label: "생산성", value: "+32%" },
      { label: "불량률", value: "-45%" },
      { label: "가동률", value: "98.5%" },
    ],
    body: "설비 설계부터 제어 소프트웨어, 시운전까지 턴키로 수행했다. (placeholder)",
  },
  {
    slug: "2023-smart-factory-mes",
    title: "스마트팩토리 MES 도입",
    date: "2023-06",
    category: "설비 구축",
    summary:
      "생산 실적을 실시간으로 수집·가시화하는 MES를 구축해 관리 리드타임을 단축했다.",
    metrics: [
      { label: "리드타임", value: "-28%" },
      { label: "실시간 수집 공정", value: "12개" },
    ],
    body: "현장 설비와 상위 시스템을 연동해 데이터 기반 의사결정 체계를 마련했다. (placeholder)",
  },
];
