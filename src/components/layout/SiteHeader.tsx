"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS } from "./navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // 단일 페이지 스크롤 스파이 (홈에 섹션이 있을 때만 동작)
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-20 items-center justify-between lg:h-24">
          <Link
            href="/"
            className="relative block h-12 w-40 sm:w-44"
            aria-label="에스씨엔지니어링 홈"
          >
            <Image
              src="/images/logo-sce.jpg"
              alt="에스씨엔지니어링 로고"
              fill
              priority
              sizes="176px"
              className="object-contain object-left"
            />
          </Link>

          <nav className="hidden md:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-8 lg:gap-10">
              {NAV_ITEMS.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id} className="relative py-2">
                    <Link
                      href={item.href}
                      className={`text-base font-semibold transition-colors ${
                        on ? "text-orange" : "text-navy hover:text-orange"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {on && (
                      <BrandLine className="absolute inset-x-0 -bottom-0.5" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-navy md:hidden"
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
          className="bg-white md:hidden"
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
