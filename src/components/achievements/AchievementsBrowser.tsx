"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";
import { BrandLine } from "@/components/ui/BrandLine";
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

interface EmptyStateProps {
  title: string;
  description: string;
}

/** 실적이 하나도 없는 경우와 조건에 맞는 실적이 없는 경우에 공통으로 쓰는 안내 영역 */
function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-ink/15 bg-white p-14 text-center">
      <p className="text-lg font-semibold text-navy">{title}</p>
      <p className="mt-2 text-base leading-relaxed text-ink/70">{description}</p>
    </div>
  );
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

  /** 리스트 좌우 이동 꺽쇠 — 배경·테두리 없이 기호만 노출한다. */
  const stepArrowClass =
    "absolute top-1/2 hidden -translate-y-1/2 place-items-center text-steel transition-colors hover:text-navy sm:grid";

  return (
    <section id="achievements" className="scroll-mt-16 sm:scroll-mt-20 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Track Record"
            title="실적현황"
            description="수행한 프로젝트를 사업 분야·연도·검색어로 확인하실 수 있습니다."
          />

          {items.length === 0 ? (
            <div className="mt-12">
              <EmptyState
                title="아직 등록된 실적이 없습니다."
                description="공식 실적 자료를 정리해 순차적으로 공개할 예정입니다. 진행 중인 프로젝트 문의는 아래 문의하기를 이용해 주시기 바랍니다."
              />
            </div>
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
                  className="group relative flex h-11 w-full items-center border border-ink/20 lg:w-[420px]"
                >
                  <input
                    type="search"
                    value={keywordInput}
                    onChange={(event) => setKeywordInput(event.target.value)}
                    placeholder="프로젝트 이름, 고객사, 발주처, 위치를 입력하세요."
                    aria-label="실적 검색"
                    className="h-full w-full bg-white px-4 text-base text-ink outline-none focus-visible:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="검색"
                    className="grid h-full w-12 shrink-0 place-items-center text-steel transition-colors hover:text-navy group-focus-within:text-navy"
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
                  {/* 포커스 시 왼쪽 → 오른쪽으로 늘어나고, 포커스가 빠지면 반대 방향으로 사라진다. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-px block origin-right scale-x-0 transition-transform duration-300 group-focus-within:origin-left group-focus-within:scale-x-100"
                  >
                    <BrandLine />
                  </span>
                </form>
              </div>

              {filtered.length === 0 ? (
                <div className="mt-10">
                  <EmptyState
                    title="선택하신 조건에 해당하는 실적이 없습니다."
                    description="검색어를 바꾸거나 사업 분야·연도 필터를 조정해 다시 찾아보시기 바랍니다."
                  />
                </div>
              ) : (
                <>
                  {/* 꺽쇠는 리스트 바깥에 겹쳐 두어, 그리드 좌우 폭을 필터 행과 맞춘다. */}
                  <div className="relative mt-10">
                    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                      {pageItems.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/achievements/${item.slug}`}
                            className="group/card flex h-full flex-col overflow-hidden rounded-sm border border-ink/15 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-concrete">
                              {/* 목록에서는 첫 번째 사진만 대표로 노출한다. */}
                              <Image
                                src={item.images[0]}
                                alt={`${item.title} 현장`}
                                fill
                                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                              />
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                              <p className="text-sm font-semibold text-orange">
                                {item.category}
                              </p>
                              <h3 className="mt-1 text-lg font-semibold leading-snug text-navy">
                                {item.title}
                              </h3>
                              <dl className="mt-3 space-y-1 text-sm leading-relaxed text-ink/75">
                                <div className="flex gap-2">
                                  <dt className="shrink-0 text-navy">고객</dt>
                                  <dd>{item.client}</dd>
                                </div>
                                <div className="flex gap-2">
                                  <dt className="shrink-0 text-navy">발주처</dt>
                                  <dd>{item.orderer}</dd>
                                </div>
                                <div className="flex gap-2">
                                  <dt className="shrink-0 text-navy">기간</dt>
                                  <dd>{item.period}</dd>
                                </div>
                                <div className="flex gap-2">
                                  <dt className="shrink-0 text-navy">위치</dt>
                                  <dd>{item.location}</dd>
                                </div>
                              </dl>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {currentPage > 1 && (
                      <button
                        type="button"
                        onClick={() => setPage(currentPage - 1)}
                        aria-label="이전 페이지"
                        className={`${stepArrowClass} -left-7`}
                      >
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    )}

                    {currentPage < totalPages && (
                      <button
                        type="button"
                        onClick={() => setPage(currentPage + 1)}
                        aria-label="다음 페이지"
                        className={`${stepArrowClass} -right-7`}
                      >
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
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
                        className={`${pageButtonClass(false)} disabled:text-steel/50`}
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
                        className={`${pageButtonClass(false)} disabled:text-steel/50`}
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
