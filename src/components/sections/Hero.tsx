import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { CompanyInfo } from "@/lib/content/types";

export function Hero({ company }: { company: CompanyInfo }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-700 text-white"
    >
      <Container>
        <div className="py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Systems and Controls
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
            {company.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            {company.name} · {company.tagline}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {company.mainBusiness.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/85"
              >
                {item}
              </li>
            ))}
          </ul>

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
    </section>
  );
}
