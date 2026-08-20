import Image from "next/image";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import type { CompanyProfile } from "@/lib/content/types";

export function About({ profile }: { profile: CompanyProfile }) {
  const { info, ceoMessage, coreValues, productGroups } = profile;

  return (
    <>
      {/* CEO Message */}
      <section className="bg-white">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.6fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange">
                CEO Message
              </p>
              {/* 로고 공간 */}
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
        </Container>
      </section>

      <BrandLine />

      {/* 회사 개요: 주요사업 + 주요생산품목 */}
      <section className="bg-concrete">
        <Container>
          <div className="py-16 sm:py-20">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              회사 개요
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {info.mainBusiness.map((business, i) => (
                <div key={business} className="bg-white p-7">
                  <BrandLine className="mb-5" />
                  <span className="font-mono text-2xl font-extrabold text-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-xl font-extrabold text-navy">
                    {business}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-16 flex items-center gap-3 text-lg font-extrabold text-navy">
              <span className="h-5 w-1 bg-orange" aria-hidden="true" />
              주요 생산품목
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {productGroups.map((group) => (
                <li key={group.label ?? group.items[0]} className="bg-white p-5">
                  {group.label && (
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-orange">
                      {group.label}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="bg-concrete px-2.5 py-1 text-xs font-medium text-ink/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <BrandLine />

      {/* 핵심 가치 (로고 톤: 오렌지·네이비) */}
      <section className="bg-white">
        <Container>
          <div className="py-16 sm:py-20">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              핵심 가치
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {coreValues.map((value, i) => (
                <div
                  key={value.title}
                  className={`p-8 text-white ${i === 0 ? "bg-orange" : "bg-navy"}`}
                >
                  <span className="font-mono text-sm font-bold text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-2xl font-extrabold">{value.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/85">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
