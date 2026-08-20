import type { Achievement } from "@/lib/content/types";

/**
 * 실제 수행 실적 원천 데이터.
 * 회사 소개서에는 실적 목록이 없으므로 공식 자료를 받기 전까지 비워 둔다.
 */
export const achievements: Achievement[] = [];

/**
 * 실적 상세 UI 확인용 데모 레코드. 실제 수행 실적이 아니며 목록·sitemap에서 제외한다.
 */
export const achievementPreview: Achievement = {
  slug: "demo-integrated-automation-project",
  title: "통합 자동화 시스템 구축 프로젝트",
  year: 2026,
  date: "2026-08",
  category: "디자인 미리보기",
  image: "/images/business-industry.jpg",
  client: "비공개 (DEMO)",
  orderer: "비공개 (DEMO)",
  location: "프로젝트 현장",
  period: "프로젝트별 상이",
  summary:
    "실제 수행 실적이 아닌 상세 페이지 디자인 확인을 위한 데모 콘텐츠입니다.",
  body: "프로젝트 개요와 적용 기술, 수행 범위, 구축 결과가 실제 실적 자료 수신 후 이 영역에 제공됩니다. 에스씨엔지니어링은 분석과 설계부터 개발·제작, 설치·시운전과 교육까지 전 과정을 책임지는 통합 엔지니어링 서비스를 제공합니다.",
  isDemo: true,
};
