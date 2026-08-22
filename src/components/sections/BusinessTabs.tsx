"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businessAreaImage } from "@/lib/images";
import type { BusinessArea } from "@/lib/content/types";

interface BusinessTabsProps {
  areas: BusinessArea[];
  initialKey?: string;
}

/** 사업영역: 상단 탭으로 분야를 선택, 좌측 사진 + 우측 내용 표시 */
export function BusinessTabs({ areas, initialKey }: BusinessTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(
    () => areas.find((a) => a.key === initialKey)?.key ?? areas[0]?.key,
  );
  const area = areas.find((a) => a.key === active) ?? areas[0];

  return (
    <section id="business" className="scroll-mt-24 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Core Business"
            title="사업영역"
            description="산업 자동화부터 빌딩 자동화, 데이터센터 인프라까지 통합 제어 솔루션을 제공합니다."
          />

          {/* 안내 문구 → 탭 → 본문 사이 세로 간격은 mt-12로 통일한다. */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/10" role="tablist" aria-label="사업영역 선택">
            {areas.map((a, index) => {
              const on = a.key === area.key;
              return (
                <button
                  key={a.key}
                  type="button"
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  onClick={() => setActive(a.key)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                    event.preventDefault();
                    const direction = event.key === "ArrowRight" ? 1 : -1;
                    const nextIndex = (index + direction + areas.length) % areas.length;
                    setActive(areas[nextIndex].key);
                    tabRefs.current[nextIndex]?.focus();
                  }}
                  className="relative pb-4"
                  role="tab"
                  aria-selected={on}
                  aria-controls="business-panel"
                  tabIndex={on ? 0 : -1}
                >
                  <span
                    className={`text-base font-semibold transition-colors ${
                      on ? "text-orange" : "text-navy hover:text-orange"
                    }`}
                  >
                    {a.title}
                  </span>
                  {on && (
                    <BrandLine className="absolute inset-x-0 -bottom-px" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 좌측 사진 / 우측 내용 */}
          <div
            id="business-panel"
            role="tabpanel"
            className="mt-12 grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-concrete lg:aspect-auto lg:min-h-[500px]">
              <Image
                src={businessAreaImage[area.key]}
                alt={`${area.title} 현장`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* 2열 설명은 항상 1열 이미지 상단과 같은 높이에서 시작한다(탭 전환 시에도 고정). */}
            <div className="flex flex-col lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange">
                {area.titleEn}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-navy">
                {area.title}
              </h3>
              {/* 문장이 임의로 줄바꿈되지 않도록 한 줄 = 한 항목으로 나열한다. */}
              <ul className="mt-10 grid gap-y-4">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-base leading-relaxed text-ink/85"
                  >
                    <svg
                      className="mt-1.5 h-4 w-4 shrink-0 text-orange"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
