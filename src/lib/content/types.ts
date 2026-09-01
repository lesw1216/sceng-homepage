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
  /** 사업자등록번호 */
  businessNumber: string;
  /** Hero 제목. 줄바꿈 위치가 디자인 요구사항이라 줄 단위로 관리한다. */
  headlineLines: string[];
  /** headlineLines를 한 줄로 이은 값 (accessor 파생). 평문이 필요한 곳에서 쓴다. */
  headline: string;
  /** 보조 태그라인 */
  tagline: string;
  /** 주요 사업 키워드 */
  mainBusiness: string[];
  contact: CompanyContact;
}

/** 원천 데이터가 제공하는 회사 정보. headline은 accessor가 headlineLines에서 파생한다. */
export type CompanyInfoSource = Omit<CompanyInfo, "headline">;

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
  /** 회사소개 섹션 제목 아래 부제 */
  aboutTagline: string;
  /** 인사말 상단 인용구 (줄바꿈 위치가 디자인 요구사항이라 줄 단위로 관리한다) */
  greetingQuoteLines: string[];
  /** 인용구 아래 마무리 문구 중 강조(오렌지) 부분 */
  greetingHighlight: string;
  /** 강조 뒤에 이어지는 마무리 문구 */
  greetingClosing: string;
  /** CEO 인사말 문단 */
  ceoMessage: string[];
  /** 인사말 말미 서명 문구 */
  ceoSignature: string;
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
  /** 사업 분야 */
  businessFields: string[];
  /** 생산 품목 */
  productItems: string[];
  /** 솔루션 */
  solutions: string[];
}

/* ─── 실적현황 ─────────────────────────────────────────── */

/** 실적 카드에 노출하는 정량 지표 */
export interface Metric {
  label: string;
  value: string;
}

/** 원천 데이터(로컬 파일 또는 백엔드 API)가 제공하는 실적 1건 */
export interface AchievementSource extends ContentRecord {
  /** 실제 실적이 아닌 UI 확인용 데모 레코드 */
  isDemo?: boolean;
  /** 사업 분야 (ACHIEVEMENT_CATEGORIES의 key) */
  areaKey: string;
  /** 프로젝트 사진 목록 (public/images 경로). 첫 장이 목록·OG용 대표 사진이다. */
  images: string[];
  /** 고객 */
  client: string;
  /** 위치 */
  location: string;
  /** 프로젝트 시작일 (YYYY-MM) */
  startDate: string;
  /** 프로젝트 종료일 (YYYY-MM) */
  endDate: string;
  /** 등록 순서. 시작일·종료일이 모두 같을 때의 정렬 기준 */
  sequence: number;
  /** 정량 지표 (선택) */
  metrics?: Metric[];
}

/** 화면에서 소비하는 실적 1건. year·period·category는 accessor가 파생한다. */
export interface Achievement extends AchievementSource {
  /** 시작일 기준 연도 (필터 키) */
  year: number;
  /** 표시용 기간 문자열 */
  period: string;
  /** areaKey를 ACHIEVEMENT_CATEGORIES에서 조회한 표시 라벨 */
  category: string;
}

/** 실적 사업 분야 필터 선택지 */
export interface AchievementCategory {
  key: string;
  label: string;
}
