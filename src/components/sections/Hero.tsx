import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { CompanyInfo } from "@/lib/content/types";

export function Hero({ company }: { company: CompanyInfo }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      <Image
        src="/images/hero-automation.jpg"
        alt="로봇 팔이 가동되는 산업 자동화 생산 라인"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* 텍스트 가독성용 오버레이 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/80 to-transparent"
      />

      <Container>
        <div className="py-28 sm:py-40">
          <div className="flex items-center gap-3">
            <span className="h-7 w-1.5 bg-orange" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Systems and Controls
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl">
            {company.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
            {company.name} · {company.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#business" variant="primary">
              사업영역 보기
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              문의하기
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* 3대 사업 스트립 */}
      <div className="relative border-t border-white/15 bg-navy/50 backdrop-blur-sm">
        <Container>
          <ul className="grid sm:grid-cols-3 sm:divide-x sm:divide-white/15">
            {company.mainBusiness.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-4 py-6 sm:px-8 sm:first:pl-0"
              >
                <span className="font-mono text-3xl font-extrabold text-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-bold">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
