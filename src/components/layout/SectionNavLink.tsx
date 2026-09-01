"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

interface SectionNavLinkProps {
  /** "/#about" 형태의 단일 페이지 앵커 */
  href: string;
  /** 스크롤 대상 섹션 id (href의 "#" 뒤와 동일) */
  sectionId: string;
  className?: string;
  ariaCurrent?: "true";
  /** 클릭 시 추가로 실행할 동작 (예: 모바일 메뉴 닫기) */
  onNavigate?: () => void;
  children: ReactNode;
}

/**
 * 이미 같은 해시(#about 등)에 있으면 브라우저가 hashchange를 발생시키지 않아
 * 같은 메뉴를 다시 눌러도 스크롤이 일어나지 않는다(수동 스크롤 후 재클릭,
 * 로고 클릭으로 상단 이동 후 재클릭 시 재현). 홈에서는 해시 변화 여부와 무관하게
 * 항상 직접 scrollIntoView로 이동시키고 주소는 replaceState로만 맞춘다.
 */
export function SectionNavLink({
  href,
  sectionId,
  className,
  ariaCurrent,
  onNavigate,
  children,
}: SectionNavLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== "/") return;
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  };

  return (
    <Link href={href} onClick={handleClick} aria-current={ariaCurrent} className={className}>
      {children}
    </Link>
  );
}
