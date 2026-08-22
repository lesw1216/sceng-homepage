"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ALL_FILTER,
  filterAchievements,
  getPageItems,
  getTotalPages,
} from "@/lib/achievements";
import type { Achievement, AchievementCategory } from "@/lib/content/types";

interface AchievementsBrowserProps {
  items: Achievement[];
  years: number[];
  categories: AchievementCategory[];
}

export function AchievementsBrowser({
  items,
  years,
  categories,
}: AchievementsBrowserProps) {
  const [keywordInput, setKeywordInput] = useState("");
  // 입력할 때마다가 아니라 검색 실행 시점에만 확정된다(추후 검색 API 요청 시점).
  const [keyword, setKeyword] = useState("");
  const [areaKey, setAreaKey] = useState<string>(ALL_FILTER);
  const [year, setYear] = useState<number | typeof ALL_FILTER>(ALL_FILTER);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterAchievements(items, { keyword, areaKey, year }),
    [areaKey, items, keyword, year],
  );

  const totalPages = getTotalPages(filtered.length);
  const currentPage = Math.min(page, totalPages);
  const pageItems = getPageItems(filtered, currentPage);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(keywordInput);
    setPage(1);
  };

  const handleAreaChange = (nextAreaKey: string) => {
    setAreaKey(nextAreaKey);
    setPage(1);
  };

  const handleYearChange = (nextYear: number | typeof ALL_FILTER) => {
    setYear(nextYear);
    setPage(1);
  };

  const areaButtonClass = (isActive: boolean) =>
    `text-base transition-colors ${
      isActive
        ? "font-semibold text-navy underline underline-offset-8"
        : "font-medium text-steel hover:text-navy"
    }`;

  const pageButtonClass = (isActive: boolean) =>
    `grid h-10 min-w-10 place-items-center border px-3 text-base transition-colors ${
      isActive
        ? "border-navy font-semibold text-navy"
        : "border-transparent font-medium text-steel hover:text-navy"
    }`;

  const stepButtonClass =
    "grid h-10 w-10 place-items-center border border-ink/15 text-lg text-navy transition-colors hover:border-navy";

  return (
    <section id="achievements" className="scroll-mt-24 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Track Record"
            title="실적현황"
            description="수행한 프로젝트를 사업 분야·연도·검색어로 확인하실 수 있습니다."
          />

          {items.length === 0 ? (
            <p className="mt-12 border border-dashed border-steel/50 p-14 text-center text-lg font-semibold text-navy">
              아직 등록된 실적이 없습니다. 공식 실적 자료를 정리해 순차적으로 공개할
              예정입니다.
            </p>
          ) : (
            <>
              {/* 왼쪽: 사업 분야 + 연도 / 오른쪽: 검색 */}
              <div className="mt-12 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-y border-ink/10 py-6">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    type="button"
                    onClick={() => handleAreaChange(ALL_FILTER)}
                    aria-pressed={areaKey === ALL_FILTER}
                    className={areaButtonClass(areaKey === ALL_FILTER)}
                  >
                    전체
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => handleAreaChange(category.key)}
                      aria-pressed={areaKey === category.key}
                      className={areaButtonClass(areaKey === category.key)}
                    >
                      {category.label}
                    </button>
                  ))}

                  <select
                    value={year}
                    onChange={(event) =>
                      handleYearChange(
                        event.target.value === ALL_FILTER
                          ? ALL_FILTER
                          : Number(event.target.value),
                      )
                    }
                    aria-label="실적 연도"
                    className="h-11 border border-ink/20 bg-white px-3 text-base font-medium text-navy"
                  >
                    <option value={ALL_FILTER}>전체 연도</option>
                    {years.map((itemYear) => (
                      <option key={itemYear} value={itemYear}>
                        {itemYear}
                      </option>
                    ))}
                  </select>
                </div>

                <form
                  onSubmit={handleSearch}
                  role="search"
                  className="flex h-11 w-full items-center border border-ink/20 lg:w-[420px]"
                >
                  <input
                    type="search"
                    value={keywordInput}
                    onChange={(event) => setKeywordInput(event.target.value)}
                    placeholder="프로젝트 이름, 고객사, 발주처, 위치를 입력하세요."
                    aria-label="실적 검색"
                    className="h-full w-full bg-white px-4 text-base text-ink outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="검색"
                    className="grid h-full w-12 shrink-0 place-items-center text-navy transition-colors hover:text-orange"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.3-4.3M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                      />
                    </svg>
                  </button>
                </form>
              </div>

              {filtered.length === 0 ? (
                <p className="mt-10 border border-dashed border-steel/50 p-14 text-center text-lg font-semibold text-navy">
                  선택하신 조건에 해당하는 실적이 없습니다. 검색어나 필터를 변경해
                  주시기 바랍니다.
                </p>
              ) : (
                <>
                  <div className="mt-10 flex items-start gap-3 sm:gap-5">
                    {/* 리스트 좌우 페이지 이동 (첫/마지막 페이지에서는 표시하지 않는다) */}
                    <div className="w-10 shrink-0 pt-24">
                      {currentPage > 1 && (
                        <button
                          type="button"
                          onClick={() => setPage(currentPage - 1)}
                          aria-label="이전 페이지"
                          className={stepButtonClass}
                        >
                          &lt;
                        </button>
                      )}
                    </div>

                    <ul className="grid flex-1 grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                      {pageItems.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/achievements/${item.slug}`}
                            className="group flex h-full flex-col"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-concrete">
                              <Image
                                src={item.image}
                                alt={`${item.title} 현장`}
                                fill
                                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <p className="mt-4 text-sm font-semibold text-orange">
                              {item.category}
                            </p>
                            <h3 className="mt-1 text-lg font-semibold leading-snug text-navy group-hover:text-orange">
                              {item.title}
                            </h3>
                            <dl className="mt-3 space-y-1 text-sm leading-relaxed text-ink/75">
                              <div className="flex gap-2">
                                <dt className="shrink-0 text-steel">고객</dt>
                                <dd>{item.client}</dd>
                              </div>
                              <div className="flex gap-2">
                                <dt className="shrink-0 text-steel">발주처</dt>
                                <dd>{item.orderer}</dd>
                              </div>
                              <div className="flex gap-2">
                                <dt className="shrink-0 text-steel">기간</dt>
                                <dd>{item.period}</dd>
                              </div>
                              <div className="flex gap-2">
                                <dt className="shrink-0 text-steel">위치</dt>
                                <dd>{item.location}</dd>
                              </div>
                            </dl>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="w-10 shrink-0 pt-24">
                      {currentPage < totalPages && (
                        <button
                          type="button"
                          onClick={() => setPage(currentPage + 1)}
                          aria-label="다음 페이지"
                          className={stepButtonClass}
                        >
                          &gt;
                        </button>
                      )}
                    </div>
                  </div>

                  {totalPages > 1 && (
                    <nav
                      className="mt-14 flex items-center justify-center gap-2"
                      aria-label="실적 페이지"
                    >
                      <button
                        type="button"
                        onClick={() => setPage(1)}
                        disabled={currentPage === 1}
                        aria-label="맨 앞 페이지"
                        className={`${stepButtonClass} disabled:border-ink/10 disabled:text-steel/50`}
                      >
                        &laquo;
                      </button>
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (pageNumber) => (
                          <button
                            key={pageNumber}
                            type="button"
                            onClick={() => setPage(pageNumber)}
                            aria-current={pageNumber === currentPage}
                            className={pageButtonClass(pageNumber === currentPage)}
                          >
                            {pageNumber}
                          </button>
                        ),
                      )}
                      <button
                        type="button"
                        onClick={() => setPage(totalPages)}
                        disabled={currentPage === totalPages}
                        aria-label="맨 뒤 페이지"
                        className={`${stepButtonClass} disabled:border-ink/10 disabled:text-steel/50`}
                      >
                        &raquo;
                      </button>
                    </nav>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
