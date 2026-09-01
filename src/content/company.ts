import type {
  CompanyInfoSource,
  CoreValue,
  LabeledList,
} from "@/lib/content/types";

/**
 * 회사 기본 정보 (출처: 회사 소개서 2026-08-20).
 * 컴포넌트는 이 값을 직접 import 하지 말고 @/lib/content/company accessor 를 경유한다.
 */
export const companyInfo: CompanyInfoSource = {
  name: "에스씨엔지니어링(주)",
  nameEn: "Systems and Controls Engineering",
  shortName: "SCE",
  ceo: "이구호",
  businessNumber: "669-81-04046",
  headlineLines: ["스마트 공간과 최첨단 인프라를 위한", "자동화 솔루션"],
  tagline: "미래를 제어하는 기술의 신뢰를 이어가는 기업",
  mainBusiness: ["산업 자동화", "빌딩 자동화", "데이터센터 자동화"],
  contact: {
    phone: "032-710-3396",
    mobile: "010-3907-0853",
    email: "ghlee@scengineering.co.kr",
    website: "scengineering.co.kr",
    address:
      "14558 경기도 부천시 원미구 조마루로385번길 92 (부천테크노밸리 U1 센터 907호)",
    // 주소 검색은 건물만 노출돼(스마트플레이스 미반영), 등록된 장소로 바로
    // 연결되는 네이버 지도 단축 링크를 사용한다.
    mapUrl: "https://naver.me/5o0J0eFI",
  },
};

/** 회사소개 섹션 제목 아래 부제 */
export const aboutTagline = "신뢰와 기술력으로 고객과 함께 성장하겠습니다.";

/** 회사 인사말 상단 인용구 */
export const greetingQuoteLines: string[] = [
  "미래를 제어하는 기술,",
  "신뢰를 이어가는 기업",
];
export const greetingHighlight = "에스씨엔지니어링";
export const greetingClosing = "입니다.";

export const ceoMessage: string[] = [
  "안녕하십니까.",
  "저희 에스씨엔지니어링은 시스템 및 제어(Systems and Controls)라는 사명 아래, 산업 및 빌딩 자동화 분야에서 오랜 시간 쌓아온 풍부한 실무 경험과 엔지니어링 노하우를 바탕으로 출범하였습니다.",
  "현대 비즈니스 환경에서 자동화와 효율적인 인프라 관리는 기업의 생존과 직결되는 핵심 가치입니다. 에스씨엔지니어링은 단순한 시스템 구축을 넘어, 고객사의 생산성 향상, 에너지 비용 절감, 그리고 무중단 안전성을 보장하는 최적의 통합 제어 솔루션을 제공합니다.",
  "오랜 현장에서 검증된 기술력과 정직함을 무기로, 고객사의 자산가치를 극대화하는 가장 든든한 기술 파트너가 될 것을 약속드리며, 끊임없는 도전과 혁신으로 보답하겠습니다.",
  "감사합니다.",
];

/** 회사 소개 본문 말미 서명 문구 */
export const ceoSignature = "에스씨엔지니어링(주) 임직원일동 올림";

export const coreValues: CoreValue[] = [
  {
    title: "Smart Solution",
    description:
      "최신 자동화 및 제어 기술을 SMART하게 융합하여 각 현장 조건에 완벽히 정렬된 맞춤형 고효율 시스템을 구현합니다.",
  },
  {
    title: "Control & Trust",
    description:
      "철저한 엔지니어링 검증과 정밀 시공, 체계적인 사후관리를 통해 고객 자산의 안정성과 두터운 신뢰를 확보합니다.",
  },
];

export const productGroups: LabeledList[] = [
  {
    items: ["PLC 및 INVERTER 자동제어반", "원격감시제어반", "데이터 수집반"],
  },
  {
    label: "동력제어반",
    items: ["소화펌프", "일반 MCC반", "용·하수 펌프"],
  },
  {
    items: ["스마트 분전반", "스마트 MCC반"],
  },
  {
    label: "PLC 제어",
    items: ["MITSUBISHI", "SCHNEIDER", "SIEMENS", "LSE"],
  },
  {
    label: "SCADA 구축",
    items: ["SCHNEIDER", "LSE", "CIMON"],
  },
  {
    label: "HMI 구축",
    items: ["MITSUBISHI", "SCHNEIDER"],
  },
  {
    label: "Solution",
    items: ["WCS", "EPMS", "DCIM", "SI/FMS", "EMCS", "BAS"],
  },
];
