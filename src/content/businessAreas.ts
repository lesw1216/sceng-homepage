import type { BusinessArea } from "@/lib/content/types";

/**
 * 사업영역 (출처: 회사 소개서 2026-08-20, "CORE BUSINESS").
 */
export const businessAreas: BusinessArea[] = [
  {
    key: "industry-automation",
    title: "산업 자동화",
    titleEn: "Industry Automation",
    accent: "orange",
    items: [
      "공장 자동화시스템 (FA)",
      "물류 자동화시스템 (LA)",
      "공정 자동화시스템 (PA)",
      "유틸리티 자동화시스템 (UA)",
      "냉동공조 자동화시스템 (HVAC)",
      "전력감시제어시스템 (PMS)",
      "수경재배 자동화 (HYA)",
      "용수 처리 및 공급 시스템 (WTSMS)",
      "하수처리시스템 (WTS)",
    ],
  },
  {
    key: "building-automation",
    title: "빌딩 자동화",
    titleEn: "Building Energy & Control System",
    accent: "navy",
    items: [
      "통합시스템 (SI)",
      "시설관리 시스템 (FMS)",
      "전력자동제어 (PEAS)",
      "설비자동제어 (BAS)",
      "조명자동제어 (LCS)",
      "에너지 관리시스템 (EMS)",
    ],
  },
  {
    key: "datacenter-infra",
    title: "데이터센터 인프라 솔루션",
    titleEn: "EPMS / DCIM",
    accent: "graphite",
    items: [
      "전력설비품질 감시·제어·관리 (EPMS)",
      "IT자산·상면·전력·냉각설비 통합관리 (DCIM)",
      "PUE(에너지 효율 지표) 감시·제어·관리",
      "순간 정전 대응 및 예방 정비 지원",
    ],
  },
];
