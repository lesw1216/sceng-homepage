"use client";

import { useRef, useState } from "react";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BusinessArea } from "@/lib/content/types";

interface BusinessTabsProps {
  areas: BusinessArea[];
  initialKey?: string;
}

/** 사업영역: 상단 탭으로 분야를 선택, 보유기술과 동일한 3열 박스로 본문 표시 */
export function BusinessTabs({ areas, initialKey }: BusinessTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(
    () => areas.find((a) => a.key === initialKey)?.key ?? areas[0]?.key,
  );
  const area = areas.find((a) => a.key === active) ?? areas[0];

  const panels = [
    { title: "사업 분야", items: area.businessFields },
    { title: "생산 품목", items: area.productItems },
    { title: "솔루션", items: area.solutions },
  ];

  return (
    <section id="business" className="scroll-mt-16 sm:scroll-mt-20 bg-white">
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
                  className={`group relative pb-4 text-base transition-colors ${
                    on ? "font-semibold text-orange" : "font-medium text-steel hover:text-navy"
                  }`}
                  role="tab"
                  aria-selected={on}
                  aria-controls="business-panel"
                  tabIndex={on ? 0 : -1}
                >
                  {a.title}
                  {/* 활성: 오렌지 밑줄 고정. hover: 네이비 밑줄이 좌→우로 늘어나고, 벗어나면 반대 방향으로 사라진다. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-0.5 transition-transform duration-300 ${
                      on
                        ? "scale-x-100 bg-orange"
                        : "origin-right scale-x-0 bg-navy group-hover:origin-left group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 보유기술 본문과 동일한 3열 박스 디자인. 번호·우측 그림자 숫자는 제외한다. */}
          <div id="business-panel" role="tabpanel" className="mt-12 grid gap-6 lg:grid-cols-3">
            {panels.map((panel) => (
              <div
                key={panel.title}
                className="flex h-full flex-col border-x border-b border-ink/15"
              >
                <BrandLine />
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="text-xl font-semibold text-navy">{panel.title}</h3>
                  <ul className="mt-6 space-y-1.5">
                    {panel.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-base leading-relaxed text-ink/80"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-navy" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
