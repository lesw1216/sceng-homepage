"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS } from "./navigation";

interface SiteHeaderProps {
  companyName: string;
  shortName: string;
}

/** 상단 고정 네비게이션. 모바일 메뉴 토글 때문에 client 컴포넌트. */
export function SiteHeader({ companyName, shortName }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-orange text-sm font-bold tracking-tight">
              {shortName}
            </span>
            <span className="text-base font-semibold tracking-tight">
              {companyName}
            </span>
          </a>

          <nav className="hidden md:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-white/80 transition-colors hover:text-orange"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="메뉴 열기"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
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
          className="border-t border-white/10 bg-navy md:hidden"
          aria-label="모바일 메뉴"
        >
          <Container>
            <ul className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-medium text-white/80 hover:text-orange"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
