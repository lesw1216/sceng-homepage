import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CompanyProfile } from "@/lib/content/types";

export function About({ profile }: { profile: CompanyProfile }) {
  const { info, ceoMessage, coreValues, productGroups } = profile;

  const overview = [
    { label: "회사명", value: `${info.name} [${info.nameEn}]` },
    { label: "대표이사", value: info.ceo },
    { label: "주요사업", value: info.mainBusiness.join(" | ") },
  ];

  return (
    <section id="about" className="scroll-mt-24 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Company"
            title="회사소개"
            description={info.headline}
          />

          {/* CEO Message */}
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <div className="border-t-4 border-orange pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange">
                CEO Message
              </p>
              <div className="relative mt-8 h-32 w-64">
                <Image
                  src="/images/logo-sce.jpg"
                  alt="에스씨엔지니어링 로고"
                  fill
                  sizes="240px"
                  className="object-contain object-left"
                />
              </div>
              <p className="mt-8 text-sm font-bold uppercase tracking-wider text-steel">
                {info.name} 대표이사 {info.ceo}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold leading-tight tracking-[-0.03em] text-navy sm:text-4xl">
                미래를 제어하는 기술,
                <br />
                신뢰를 이어가는 기업
              </p>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/80">
                {ceoMessage.map((paragraph) => (
                  <p key={paragraph.slice(0, 16)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 회사 개요 & 핵심 가치 */}
          <div className="mt-24 grid gap-12 border-t border-ink/10 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {/* 회사 개요 */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-navy">회사 개요</h3>
              <dl className="mt-7 border-y border-ink/15">
                {overview.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-2 border-b border-ink/10 py-5 last:border-b-0 sm:grid-cols-[120px_1fr]"
                  >
                    <dt className="text-sm font-bold uppercase tracking-wider text-orange">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-medium leading-relaxed text-ink/85">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h4 className="mt-10 flex items-center gap-3 text-lg font-bold text-navy">
                <span className="h-5 w-1 bg-orange" aria-hidden="true" />
                주요 생산품목
              </h4>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {productGroups.map((group) => (
                  <li
                    key={group.label ?? group.items[0]}
                    className="border border-ink/15 bg-concrete/30 p-5"
                  >
                    {group.label && (
                      <p className="mb-2.5 text-sm font-bold uppercase tracking-wider text-orange">
                        {group.label}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="border border-ink/10 px-2.5 py-1 text-sm font-medium text-ink/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 핵심 가치 */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-navy">핵심 가치</h3>
              <div className="mt-7 grid gap-5">
                {coreValues.map((value, i) => (
                  <div
                    key={value.title}
                    className="relative overflow-hidden border border-ink/15 p-8"
                  >
                    <span className="absolute right-3 top-0 text-8xl font-bold leading-none text-concrete" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-xl font-semibold text-navy">
                        {value.title}
                      </h4>
                    </div>
                    <p className="relative mt-4 text-base leading-relaxed text-ink/75">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
