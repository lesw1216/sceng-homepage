import { Section } from "@/components/ui/Section";
import type { CompanyProfile } from "@/lib/content/types";

export function About({ profile }: { profile: CompanyProfile }) {
  const { info, ceoMessage, coreValues, productGroups } = profile;

  return (
    <Section
      id="about"
      eyebrow="Company"
      title="회사소개"
      description={info.headline}
    >
      {/* CEO 인사말 */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            CEO Message
          </p>
          <p className="mt-3 text-2xl font-bold leading-snug text-navy">
            『미래를 제어하는 기술, 신뢰를 이어가는 기업』
          </p>
          <p className="mt-4 text-sm text-ink/60">
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
      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {coreValues.map((value) => (
          <div key={value.title} className="rounded-2xl bg-navy p-8 text-white">
            <h3 className="text-xl font-bold">{value.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      {/* 주요 생산품목 */}
      <div className="mt-16">
        <h3 className="text-lg font-bold text-navy">주요 생산품목</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productGroups.map((group) => (
            <li
              key={group.label ?? group.items[0]}
              className="rounded-xl border border-steel/20 bg-white p-5"
            >
              {group.label && (
                <p className="mb-2.5 text-sm font-semibold text-navy">
                  {group.label}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded bg-mist px-2 py-1 text-xs text-ink/70"
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
