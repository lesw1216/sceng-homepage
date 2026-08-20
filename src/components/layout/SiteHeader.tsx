"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS } from "./navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="relative block h-12 w-44"
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
            <ul className="flex items-center gap-9">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative py-2">
                    <Link
                      href={item.href}
                      className={`text-sm font-bold transition-colors ${
                        active ? "text-orange" : "text-navy hover:text-orange"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {active && (
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
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm font-bold ${
                      isActive(item.href) ? "text-orange" : "text-navy"
                    }`}
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
