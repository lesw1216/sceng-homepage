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
        <div className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Company"
            title="회사소개"
            description={info.headline}
          />

          {/* CEO Message */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.6fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange">
                CEO Message
              </p>
              <div className="relative mt-6 h-28 w-60">
                <Image
                  src="/images/logo-sce.jpg"
                  alt="에스씨엔지니어링 로고"
                  fill
                  sizes="240px"
                  className="object-contain object-left"
                />
              </div>
              <p className="mt-6 text-sm font-medium text-ink/60">
                {info.name} 대표이사 {info.ceo}
              </p>
            </div>
            <div>
              <p className="border-l-4 border-orange pl-5 text-2xl font-extrabold leading-snug text-navy sm:text-3xl">
                미래를 제어하는 기술,
                <br />
                신뢰를 이어가는 기업
              </p>
              <div className="mt-7 space-y-4 text-base leading-8 text-ink/80">
                {ceoMessage.map((paragraph) => (
                  <p key={paragraph.slice(0, 16)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 회사 개요 & 핵심 가치 */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            {/* 회사 개요 */}
            <div>
              <h3 className="text-xl font-extrabold text-navy">회사 개요</h3>
              <dl className="mt-6 border-2 border-ink/10">
                {overview.map((row) => (
                  <div
                    key={row.label}
                    className="flex gap-4 border-b border-ink/10 px-6 py-4 last:border-b-0"
                  >
                    <dt className="w-20 shrink-0 font-mono text-xs font-bold uppercase tracking-wider text-orange">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-ink/85">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h4 className="mt-10 flex items-center gap-3 text-lg font-extrabold text-navy">
                <span className="h-5 w-1 bg-orange" aria-hidden="true" />
                주요 생산품목
              </h4>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {productGroups.map((group) => (
                  <li
                    key={group.label ?? group.items[0]}
                    className="border-2 border-ink/10 p-4"
                  >
                    {group.label && (
                      <p className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-orange">
                        {group.label}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="border border-ink/10 px-2.5 py-1 text-xs font-medium text-ink/80"
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
              <h3 className="text-xl font-extrabold text-navy">핵심 가치</h3>
              <div className="mt-6 grid gap-5">
                {coreValues.map((value, i) => (
                  <div
                    key={value.title}
                    className="border-2 border-ink/10 border-l-4 border-l-orange p-7"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-2xl font-extrabold text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-xl font-extrabold text-navy">
                        {value.title}
                      </h4>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink/75">
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
