import { Section } from "@/components/ui/Section";
import { accentBg, accentText } from "@/lib/accent";
import type { BusinessArea } from "@/lib/content/types";

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
            className="flex flex-col border-2 border-ink/10 bg-white"
          >
            <div className={`px-7 py-6 text-white ${accentBg[area.accent]}`}>
              <span className="font-mono text-sm font-bold text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-2xl font-extrabold">{area.title}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/80">
                {area.titleEn}
              </p>
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
