export interface NavItem {
  /** 홈 단일 페이지의 앵커 (상세 페이지 등 어디서든 홈 섹션으로 이동) */
  href: string;
  /** 스크롤 스파이용 섹션 id */
  id: string;
  label: string;
}

/** 단일 페이지 앵커 네비게이션 (헤더·푸터 공용) */
export const NAV_ITEMS: NavItem[] = [
  { href: "/#about", id: "about", label: "회사소개" },
  { href: "/#tech", id: "tech", label: "보유기술" },
  { href: "/#business", id: "business", label: "사업영역" },
  { href: "/#achievements", id: "achievements", label: "실적현황" },
  { href: "/#contact", id: "contact", label: "Contact" },
];
