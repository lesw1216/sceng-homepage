import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { CompanyInfo } from "@/lib/content/types";

const gridPattern = {
  backgroundImage:
    "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

export function Hero({ company }: { company: CompanyInfo }) {
  return (
    <section id="top" className="relative overflow-hidden bg-graphite text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={gridPattern}
      />
      {/* 우상단 오렌지 글로우 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange/20 blur-3xl"
      />

      <Container>
        <div className="relative py-24 sm:py-36">
          <div className="flex items-center gap-3">
            <span className="h-7 w-1.5 bg-orange" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              Systems and Controls
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            {company.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
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
      <div className="relative border-t border-white/10">
        <Container>
          <ul className="grid sm:grid-cols-3 sm:divide-x sm:divide-white/10">
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
