/**
 * 콘텐츠 도메인 타입.
 * 모든 콘텐츠 record는 ContentRecord를 확장한다.
 * 저장 형태(로컬 TS)는 접근 계층 내부 구현이며, 향후 백엔드 API로 교체되어도
 * 이 타입 계약은 유지된다. (see .claude/rules/data-layer.md)
 */

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

/** 실적 카드에 노출하는 정량 지표 */
export interface Metric {
  label: string;
  value: string;
}

/** 실적 현황 1건 = 게시글 1건 */
export interface Achievement extends ContentRecord {
  metrics: Metric[];
  /** 분류(예: "공장 자동화", "설비 구축") */
  category?: string;
  /** 발주처·고객사 (공개 가능 시) */
  client?: string;
}
