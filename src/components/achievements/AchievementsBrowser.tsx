"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Achievement } from "@/lib/content/types";

interface AchievementsBrowserProps {
  items: Achievement[];
  years: number[];
  preview: Achievement;
}

export function AchievementsBrowser({
  items,
  years,
  preview,
}: AchievementsBrowserProps) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))],
    [items],
  );
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const searchable = [
        item.title,
        item.client,
        item.orderer,
        item.location,
        item.category,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (year === "all" || item.year === year) &&
        (category === "all" || item.category === category) &&
        (normalizedQuery === "" || searchable.includes(normalizedQuery))
      );
    });
  }, [category, items, query, year]);

  const chipClass = (isActive: boolean) =>
    `border px-4 py-2 text-sm font-bold transition-colors ${
      isActive
        ? "border-navy bg-navy text-white"
        : "border-ink/15 bg-white text-navy hover:border-orange hover:text-orange"
    }`;

  return (
    <section id="achievements" className="scroll-mt-24 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Track Record"
            title="실적현황"
            description="검증된 수행 경험은 정확한 자료를 바탕으로 공개합니다."
          />

          {items.length === 0 ? (
            <div className="mt-14 grid overflow-hidden border border-ink/15 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[360px] bg-navy p-8 text-white sm:p-12">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-amber">
                  Official Records
                </span>
                <p className="mt-8 max-w-lg text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  공식 수행 실적 자료를 준비하고 있습니다.
                </p>
                <p className="mt-6 max-w-xl leading-7 text-white/75">
                  고객사와 프로젝트 정보를 검토한 뒤 정확한 내용으로 업데이트하겠습니다.
                  자세한 수행 역량은 보유기술과 사업영역에서 확인하실 수 있습니다.
                </p>
                <div className="absolute inset-x-0 bottom-0">
                  <BrandLine />
                </div>
              </div>

              <Link
                href={`/achievements/${preview.slug}`}
                className="group flex flex-col bg-white p-8 transition-colors hover:bg-concrete/50 sm:p-12"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-orange px-3 py-1 font-mono text-xs font-bold tracking-wider text-white">
                    DEMO
                  </span>
                  <span className="font-mono text-xs text-steel">UI PREVIEW</span>
                </div>
                <div className="relative mt-8 aspect-[16/9] overflow-hidden">
                  <Image
                    src={preview.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold leading-snug text-navy">
                  실적 상세 디자인 미리보기
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink/70">
                  실제 수행 실적이 아닌 상세 페이지 구성 확인용 데모입니다.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange">
                  상세 화면 확인 <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-12 grid gap-5 border-y border-ink/10 py-6 lg:grid-cols-[1fr_auto]">
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="프로젝트명 · 고객사 · 지역 검색"
                  aria-label="실적 검색"
                  className="w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-orange lg:max-w-md"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    className={chipClass(category === "all")}
                  >
                    전체 분야
                  </button>
                  {categories.map((itemCategory) => (
                    <button
                      key={itemCategory}
                      type="button"
                      onClick={() => setCategory(itemCategory)}
                      className={chipClass(category === itemCategory)}
                    >
                      {itemCategory}
                    </button>
                  ))}
                  <select
                    value={year}
                    onChange={(event) =>
                      setYear(event.target.value === "all" ? "all" : Number(event.target.value))
                    }
                    aria-label="실적 연도"
                    className="border border-ink/20 bg-white px-4 py-2 text-sm font-bold text-navy"
                  >
                    <option value="all">전체 연도</option>
                    {years.map((itemYear) => (
                      <option key={itemYear} value={itemYear}>
                        {itemYear}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="mt-8 border border-dashed border-steel/50 p-14 text-center">
                  <p className="text-lg font-bold text-navy">검색 결과가 없습니다.</p>
                </div>
              ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/achievements/${item.slug}`}
                      className="group border border-ink/15 bg-white transition-colors hover:border-orange"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={`${item.title} 현장`}
                          fill
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <span className="font-mono text-xs font-bold text-orange">
                          {item.year} · {item.category}
                        </span>
                        <h3 className="mt-2 text-xl font-extrabold text-navy">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-sm text-ink/70">
                          {item.client} · {item.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
