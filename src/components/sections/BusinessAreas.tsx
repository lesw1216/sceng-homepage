import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { accentBg, accentText } from "@/lib/accent";
import type { BusinessArea } from "@/lib/content/types";

/** 사업영역 key → 대표 이미지 (public/images) */
const areaImage: Record<string, string> = {
  "industry-automation": "/images/business-industry.jpg",
  "building-automation": "/images/business-building.jpg",
  "datacenter-infra": "/images/business-datacenter.jpg",
};

export function BusinessAreas({ areas }: { areas: BusinessArea[] }) {
  return (
    <Section
      id="business"
      index="03"
      eyebrow="Core Business"
      title="사업영역"
      description="산업 자동화부터 빌딩 자동화, 데이터센터 인프라까지 통합 제어 솔루션을 제공합니다."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {areas.map((area, i) => (
          <article
            key={area.key}
            className="group flex flex-col overflow-hidden border-2 border-ink/10 bg-white"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={areaImage[area.key] ?? "/images/business-industry.jpg"}
                alt={`${area.title} 현장`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1.5 ${accentBg[area.accent]}`}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="font-mono text-sm font-bold text-white/75">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-0.5 text-2xl font-extrabold">{area.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/80">
                  {area.titleEn}
                </p>
              </div>
            </div>

            <ul className="flex-1 divide-y divide-ink/[0.07] px-7">
              {area.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 py-3 text-sm font-medium leading-6 text-ink/85"
                >
                  <svg
                    className={`mt-1 h-4 w-4 shrink-0 ${accentText[area.accent]}`}
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
          </article>
        ))}
      </div>
    </Section>
  );
}
