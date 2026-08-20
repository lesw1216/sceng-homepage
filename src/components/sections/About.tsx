import { Section } from "@/components/ui/Section";
import type { CompanyProfile } from "@/lib/content/types";

export function About({ profile }: { profile: CompanyProfile }) {
  const { info, ceoMessage, coreValues, productGroups } = profile;

  return (
    <Section
      id="about"
      index="01"
      eyebrow="Company"
      title="회사소개"
      description={info.headline}
    >
      {/* CEO 인사말 */}
      <div className="grid gap-10 border-t-2 border-ink/10 pt-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange">
            CEO Message
          </p>
          <p className="mt-4 border-l-4 border-orange pl-4 text-2xl font-extrabold leading-snug text-navy">
            미래를 제어하는 기술,
            <br />
            신뢰를 이어가는 기업
          </p>
          <p className="mt-4 text-sm font-medium text-ink/60">
            {info.name} 대표이사 {info.ceo}
          </p>
        </div>
        <div className="space-y-4 text-base leading-8 text-ink/80">
          {ceoMessage.map((paragraph) => (
            <p key={paragraph.slice(0, 16)}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* 핵심 가치 */}
      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        {coreValues.map((value) => (
          <div
            key={value.title}
            className="border-l-4 border-orange bg-navy p-8 text-white"
          >
            <h3 className="text-xl font-extrabold">{value.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      {/* 주요 생산품목 */}
      <div className="mt-16">
        <h3 className="flex items-center gap-3 text-lg font-extrabold text-navy">
          <span className="h-5 w-1 bg-orange" aria-hidden="true" />
          주요 생산품목
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productGroups.map((group) => (
            <li
              key={group.label ?? group.items[0]}
              className="border-2 border-ink/10 bg-white p-5 transition-colors hover:border-orange"
            >
              {group.label && (
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-orange">
                  {group.label}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm bg-concrete px-2.5 py-1 text-xs font-medium text-ink/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
