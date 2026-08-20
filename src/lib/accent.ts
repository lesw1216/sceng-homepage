import type { BrandAccent } from "./content/types";

/**
 * BrandAccent → Tailwind 클래스 매핑.
 * Tailwind는 문자열 동적 조합을 스캔하지 못하므로 정적 매핑으로 노출한다.
 */
export const accentBg: Record<BrandAccent, string> = {
  orange: "bg-orange",
  navy: "bg-navy",
  graphite: "bg-graphite",
  amber: "bg-amber",
};

export const accentText: Record<BrandAccent, string> = {
  orange: "text-orange",
  navy: "text-navy",
  graphite: "text-graphite",
  amber: "text-amber",
};

/** 카드 좌측/상단 강조 보더용 */
export const accentBorder: Record<BrandAccent, string> = {
  orange: "border-orange",
  navy: "border-navy",
  graphite: "border-graphite",
  amber: "border-amber",
};
