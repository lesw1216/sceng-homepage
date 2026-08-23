"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { HERO_SECTION_ID, NAV_ITEMS } from "./navigation";

/** 스크롤 스파이 대상. Hero(top)는 nav 항목이 아니지만 "활성 없음"을 판정하는 데 필요하다. */
const SPY_IDS = [HERO_SECTION_ID, ...NAV_ITEMS.map((item) => item.id)];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

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

  // 헤더와 본문 배경이 모두 흰색이라, 스크롤 시 그림자로 두 영역을 구분한다.
  useEffect(() => {
    const syncScrolled = () => setScrolled(window.scrollY > 0);
    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });
    return () => window.removeEventListener("scroll", syncScrolled);
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
    <header
      className={`sticky top-0 z-50 border-b border-ink/15 bg-white transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* 로고 높이는 60px 고정, 폭은 원본 비율(868:155)을 따른다. */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="block"
            aria-label="에스씨엔지니어링 홈 최상단으로 이동"
          >
            <Image
              src="/sce-logo-ko.svg"
              alt="에스씨엔지니어링 로고"
              width={868}
              height={155}
              priority
              unoptimized
              className="h-10 w-auto max-w-full object-contain object-left sm:h-15"
            />
          </Link>

          <nav className="hidden lg:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-8 lg:gap-10">
              {NAV_ITEMS.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={on ? "true" : undefined}
                      className={`group relative block py-2 text-lg font-semibold transition-colors ${
                        on ? "text-navy" : "text-steel hover:text-navy"
                      }`}
                    >
                      {item.label}
                      {/* hover 시 왼쪽 → 오른쪽으로 늘어나고, 벗어나면 반대 방향으로 사라진다. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 h-0.5 bg-navy transition-transform duration-300 ${
                          on
                            ? "scale-x-100"
                            : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                        }`}
                      />
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

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-ink/10 bg-white lg:hidden"
          aria-label="모바일 메뉴"
        >
          <Container>
            <ul className="flex flex-col divide-y divide-ink/10 py-1">
              {NAV_ITEMS.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={on ? "true" : undefined}
                      className={`block py-3 text-lg font-semibold ${
                        on ? "text-navy" : "text-steel"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
