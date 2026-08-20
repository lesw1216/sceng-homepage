"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { Achievement } from "@/lib/content/types";

interface AchievementsBrowserProps {
  items: Achievement[];
  years: number[];
}

export function AchievementsBrowser({ items, years }: AchievementsBrowserProps) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchYear = year === "all" || item.year === year;
      const haystack = [
        item.title,
        item.client,
        item.orderer,
        item.location,
        item.category,
      ]
        .join(" ")
        .toLowerCase();
      const matchQuery = q === "" || haystack.includes(q);
      return matchYear && matchQuery;
    });
  }, [items, query, year]);

  const yearButtonClass = (on: boolean) =>
    `px-4 py-2 text-sm font-bold transition-colors ${
      on ? "bg-navy text-white" : "bg-concrete text-navy hover:bg-navy/10"
    }`;

  return (
    <section className="bg-white">
      <Container>
        <div className="py-12 sm:py-16">
          {/* 검색 + 연도 필터 */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="프로젝트명 · 고객사 · 지역 검색"
                aria-label="실적 검색"
                className="w-full border-2 border-ink/15 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none focus:border-orange"
              />
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-steel"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 3.4 9.9l3.6 3.6a1 1 0 0 0 1.4-1.4l-3.6-3.6A5.5 5.5 0 0 0 9 3.5ZM5.5 9a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setYear("all")}
                className={yearButtonClass(year === "all")}
              >
                전체
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYear(y)}
                  className={yearButtonClass(year === y)}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 font-mono text-sm text-steel">
            {filtered.length} projects
          </p>

          {/* 그리드 */}
          {filtered.length === 0 ? (
            <div className="mt-6 border-2 border-dashed border-steel/40 p-14 text-center">
              <p className="text-lg font-bold text-navy">
                검색 결과가 없습니다.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <Link
                  key={item.slug}
                  href={`/achievements/${item.slug}`}
                  className="group flex flex-col border-2 border-ink/10 bg-white transition-colors hover:border-orange"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.title} 현장`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-0 top-0 bg-orange px-3 py-1 text-xs font-bold text-white">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-xs font-bold text-orange">
                      {item.year}
                    </span>
                    <h3 className="mt-1 text-lg font-extrabold leading-snug text-navy">
                      {item.title}
                    </h3>
                    <dl className="mt-4 space-y-1 text-xs text-ink/70">
                      <div className="flex gap-2">
                        <dt className="w-12 shrink-0 font-bold text-steel">
                          고객사
                        </dt>
                        <dd>{item.client}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-12 shrink-0 font-bold text-steel">
                          위치
                        </dt>
                        <dd>{item.location}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-12 shrink-0 font-bold text-steel">
                          기간
                        </dt>
                        <dd>{item.period}</dd>
                      </div>
                    </dl>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
