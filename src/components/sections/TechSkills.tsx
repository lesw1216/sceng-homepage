import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TechPhase } from "@/lib/content/types";

export function TechSkills({ phases }: { phases: TechPhase[] }) {
  return (
    <section id="tech" className="scroll-mt-16 sm:scroll-mt-20 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Technical Skills"
            title="보유기술"
            description="자동화시스템을 분석 및 설계부터 개발 · 제작 · 설치 · 시운전 · 교육까지 종합적인 서비스를 제공합니다."
          />

          {/* 단계 번호·제목을 Box 내부에 통합. 상단 테두리는 회사의 대표 선. */}
          <ol className="mt-16 grid gap-6 lg:grid-cols-3">
            {phases.map((phase, i) => (
              <li
                key={phase.title}
                className="flex h-full flex-col border-x border-b border-ink/15"
              >
                <BrandLine />
                <div className="relative flex flex-1 flex-col overflow-hidden p-8">
                  <span
                    className="absolute right-3 top-0 text-8xl font-bold leading-none text-concrete"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-navy">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-navy">
                        {phase.title}
                      </h3>
                      <p className="text-sm uppercase tracking-wider text-steel">
                        {phase.titleEn}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-8 space-y-6">
                    {phase.groups.map((group) => (
                      <div key={group.label ?? group.items[0]}>
                        {group.label && (
                          <p className="mb-2 border-b border-ink/10 pb-1 text-base font-semibold text-navy">
                            {group.label}
                          </p>
                        )}
                        <ul className="space-y-1.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-base leading-relaxed text-ink/80"
                            >
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-navy" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
