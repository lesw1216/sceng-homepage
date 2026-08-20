export interface NavItem {
  href: string;
  label: string;
}

/** 원페이지 앵커 네비게이션 항목 (헤더·푸터 공용) */
export const NAV_ITEMS: NavItem[] = [
  { href: "#about", label: "회사소개" },
  { href: "#tech", label: "보유기술" },
  { href: "#business", label: "사업영역" },
  { href: "#achievements", label: "실적현황" },
  { href: "#contact", label: "오시는 길" },
];
