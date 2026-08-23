import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CompanyProfile } from "@/lib/content/types";

export function About({ profile }: { profile: CompanyProfile }) {
  const { info, ceoMessage, ceoSignature, coreValues, productGroups } = profile;

  const overview = [
    { label: "회사명", value: `${info.name} | ${info.nameEn}` },
    { label: "대표이사", value: info.ceo },
    { label: "주요사업", value: info.mainBusiness.join(" | ") },
  ];

  return (
    <section id="about" className="scroll-mt-16 sm:scroll-mt-20 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Company"
            title="회사소개"
            description={info.headline}
          />

          {/* 회사 소개 (인사말) — 단일 컬럼, 컨테이너 전체 너비 */}
          <div className="mt-16">
            <p className="text-2xl font-bold leading-tight tracking-tight text-navy sm:text-3xl">
              미래를 제어하는 기술, 신뢰를 이어가는 기업
            </p>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/80">
              {ceoMessage.map((paragraph) => (
                <p key={paragraph.slice(0, 16)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 text-right text-lg font-bold text-navy">
              {ceoSignature}
            </p>
          </div>

          {/* 회사 개요 */}
          <div className="mt-20 border-t border-ink/10 pt-16">
            <h3 className="text-2xl font-bold tracking-tight text-navy">회사 개요</h3>
            <dl className="mt-7 border-y border-ink/15">
              {overview.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 border-b border-ink/10 py-5 last:border-b-0 sm:grid-cols-[140px_1fr]"
                >
                  <dt className="text-sm font-semibold uppercase tracking-wider text-navy">
                    {row.label}
                  </dt>
                  <dd className="text-base leading-relaxed text-ink/85">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 핵심 가치 — 두 항목을 한 행에 나란히, 상단 테두리는 회사의 대표 선 */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold tracking-tight text-navy">핵심 가치</h3>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {coreValues.map((value, i) => (
                <div
                  key={value.title}
                  className="relative flex h-full flex-col overflow-hidden border-x border-b border-ink/15"
                >
                  <BrandLine />
                  <div className="relative p-8">
                    <span
                      className="absolute right-3 top-0 text-8xl font-bold leading-none text-concrete"
                      aria-hidden="true"
                    >
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
                </div>
              ))}
            </div>
          </div>

          {/* 주요 생산품목 */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold tracking-tight text-navy">주요 생산품목</h3>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {productGroups.map((group) => (
                <li
                  key={group.label ?? group.items[0]}
                  className="border border-ink/15 bg-white p-5"
                >
                  {group.label && (
                    <p className="mb-2.5 text-sm font-semibold uppercase tracking-wider text-orange">
                      {group.label}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border border-ink/10 px-2.5 py-1 text-sm text-ink/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
