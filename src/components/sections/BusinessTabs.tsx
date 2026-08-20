"use client";

import Image from "next/image";
import { useState } from "react";
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
  const [active, setActive] = useState(
    () => areas.find((a) => a.key === initialKey)?.key ?? areas[0]?.key,
  );
  const area = areas.find((a) => a.key === active) ?? areas[0];

  return (
    <section id="business" className="scroll-mt-24 bg-white">
      <Container>
        <div className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Core Business"
            title="사업영역"
            description="산업 자동화부터 빌딩 자동화, 데이터센터 인프라까지 통합 제어 솔루션을 제공합니다."
          />

          {/* 탭 (헤더 네비와 동일한 형태) */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/10">
            {areas.map((a) => {
              const on = a.key === area.key;
              return (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setActive(a.key)}
                  className="relative py-3"
                  aria-current={on}
                >
                  <span
                    className={`text-base font-bold transition-colors ${
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
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy lg:aspect-auto lg:min-h-[440px]">
              <Image
                src={businessAreaImage[area.key]}
                alt={`${area.title} 현장`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange">
                {area.titleEn}
              </p>
              <h3 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">
                {area.title}
              </h3>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium leading-6 text-ink/85"
                  >
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-orange"
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
