/**
 * 콘텐츠 도메인 타입.
 * 게시글 성격의 데이터는 ContentRecord를 확장한다.
 * 저장 형태(로컬 TS)는 접근 계층 내부 구현이며, 향후 백엔드 API로 교체되어도
 * 이 타입 계약은 유지된다. (see .claude/rules/data-layer.md)
 */

/** 팔레트에서 강조에 쓸 수 있는 토큰 (see .claude/rules/design-system.md) */
export type BrandAccent = "orange" | "navy" | "graphite" | "amber";

/** 게시글 성격의 콘텐츠 1건이 공통으로 가지는 필드 */
export interface ContentRecord {
  /** URL·조회 키로 쓰는 고유 식별자 (kebab-case) */
  slug: string;
  title: string;
  /** 발생/게시 시점. ISO 형식(YYYY-MM 또는 YYYY-MM-DD) */
  date: string;
  /** 목록·카드·메타 description용 한 줄 요약 */
  summary: string;
  /** 상세 본문 (Markdown 또는 일반 텍스트) */
  body: string;
}

/* ─── 회사 정보 ─────────────────────────────────────────── */

export interface CompanyContact {
  phone: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
  /** 네이버 지도 검색 링크 (API 미사용, 새 탭 이동용) */
  mapUrl: string;
}

export interface CompanyInfo {
  /** 국문 정식 명칭 */
  name: string;
  /** 영문 명칭 */
  nameEn: string;
  /** 로고/약칭 */
  shortName: string;
  ceo: string;
  /** 대표 슬로건 */
  headline: string;
  /** 보조 태그라인 */
  tagline: string;
  /** 주요 사업 키워드 */
  mainBusiness: string[];
  contact: CompanyContact;
}

/** 핵심 가치 카드 */
export interface CoreValue {
  title: string;
  titleEn?: string;
  description: string;
}

/** 라벨이 붙은 문자열 목록 (주요생산품목 등) */
export interface LabeledList {
  label?: string;
  items: string[];
}

/** 회사소개 섹션에서 함께 소비되는 회사 프로필 묶음 */
export interface CompanyProfile {
  info: CompanyInfo;
  /** CEO 인사말 문단 */
  ceoMessage: string[];
  coreValues: CoreValue[];
  /** 주요 생산품목 */
  productGroups: LabeledList[];
}

/* ─── 보유기술 ─────────────────────────────────────────── */

/** 보유기술 단계(분석·설계 / 개발·제작 / 설치·시운전) */
export interface TechPhase {
  title: string;
  titleEn: string;
  accent: BrandAccent;
  groups: LabeledList[];
}

/* ─── 사업영역 ─────────────────────────────────────────── */

export interface BusinessArea {
  key: string;
  title: string;
  titleEn: string;
  accent: BrandAccent;
  items: string[];
}

/* ─── 실적현황 ─────────────────────────────────────────── */

/** 실적 카드에 노출하는 정량 지표 */
export interface Metric {
  label: string;
  value: string;
}

/** 실적 현황 1건 = 게시글 1건 (프로젝트) */
export interface Achievement extends ContentRecord {
  /** 연도 (필터·정렬 키) */
  year: number;
  /** 분류(예: "산업 자동화", "빌딩 자동화", "데이터센터") */
  category: string;
  /** 대표 사진 (public/images 경로) */
  image: string;
  /** 고객사 */
  client: string;
  /** 발주 */
  orderer: string;
  /** 위치 */
  location: string;
  /** 프로젝트 기간 */
  period: string;
  /** 정량 지표 (선택) */
  metrics?: Metric[];
}
