import type { BrandAccent } from "./content/types";

/**
 * BrandAccent → Tailwind 클래스 매핑.
 * Tailwind는 문자열 동적 조합을 스캔하지 못하므로 정적 매핑으로 노출한다.
 */
export const accentBg: Record<BrandAccent, string> = {
  orange: "bg-orange",
  navy: "bg-navy",
  "navy-700": "bg-navy-700",
};

export const accentText: Record<BrandAccent, string> = {
  orange: "text-orange",
  navy: "text-navy",
  "navy-700": "text-navy-700",
};
