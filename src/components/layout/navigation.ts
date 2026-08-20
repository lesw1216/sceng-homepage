export interface NavItem {
  href: string;
  label: string;
}

/** 메뉴별 페이지 네비게이션 (헤더·푸터 공용) */
export const NAV_ITEMS: NavItem[] = [
  { href: "/about", label: "회사소개" },
  { href: "/technology", label: "보유기술" },
  { href: "/business", label: "사업영역" },
  { href: "/achievements", label: "실적현황" },
  { href: "/contact", label: "Contact" },
];
