"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { HERO_SECTION_ID, NAV_ITEMS } from "./navigation";

/** 스크롤 스파이 대상. Hero(top)는 nav 항목이 아니지만 "활성 없음"을 판정하는 데 필요하다. */
const SPY_IDS = [HERO_SECTION_ID, ...NAV_ITEMS.map((item) => item.id)];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // 단일 페이지 스크롤 스파이 (클릭 이동·수동 스크롤 모두 현재 섹션을 반영)
  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (sections.length === 0) return;

    const visibleIds = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        });
        // 문서 순서상 가장 위에 걸린 섹션을 현재 위치로 본다.
        const currentId = SPY_IDS.find((id) => visibleIds.has(id)) ?? "";
        setActive(currentId === HERO_SECTION_ID ? "" : currentId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // 로고는 어느 위치·어느 페이지에서든 메인 페이지 최상단으로 보낸다.
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-14 items-center justify-between sm:h-20 xl:h-24">
          {/* 로고 높이 = 헤더 높이 - 4px → 하단 BrandLine과 2px 간격 */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="block h-[calc(100%-4px)]"
            aria-label="에스씨엔지니어링 홈 최상단으로 이동"
          >
            <Image
              src="/sce-logo-ko.svg"
              alt="에스씨엔지니어링 로고"
              width={868}
              height={155}
              priority
              unoptimized
              className="h-full w-auto max-w-full object-contain object-left"
            />
          </Link>

          <nav className="hidden lg:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-8 lg:gap-10">
              {NAV_ITEMS.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id} className="py-2">
                    {/* 활성 상태는 텍스트 색상(오렌지)만으로 표현한다. */}
                    <Link
                      href={item.href}
                      aria-current={on ? "true" : undefined}
                      className={`text-base font-semibold transition-colors ${
                        on ? "text-orange" : "text-navy hover:text-orange"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="메뉴 열기"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <BrandLine />

      {open && (
        <nav
          id="mobile-menu"
          className="bg-white lg:hidden"
          aria-label="모바일 메뉴"
        >
          <Container>
            <ul className="flex flex-col divide-y divide-ink/10 py-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-semibold text-navy"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
