import { Container } from "@/components/ui/Container";
import { BrandLine } from "@/components/ui/BrandLine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TechPhase } from "@/lib/content/types";

export function TechSkills({ phases }: { phases: TechPhase[] }) {
  return (
    <section id="tech" className="scroll-mt-24 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading
            eyebrow="Technical Skills"
            title="보유기술"
            description="분석·설계부터 개발·제작, 설치·시운전·교육까지 하나의 흐름으로 책임지고 종합적인 서비스를 제공합니다."
          />

          {/* Stepper: 노드(단계 제목)를 연결선으로 이어 하나의 흐름으로 표현.
              단계 제목은 노드에만 있고 아래 상세에는 반복하지 않는다. */}
          <div className="relative mt-20">
            {/* 노드를 잇는 연결선 (데스크톱). 노드 헤더 배경(흰색) 사이 간격에만 보인다. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-5 hidden -translate-y-1/2 sm:block"
            >
              <BrandLine />
            </span>

            <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-3">
              {phases.map((phase, i) => (
                <li key={phase.title} className="flex flex-col">
                  <div className="relative flex items-center gap-3 bg-white pr-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center bg-orange text-base font-bold text-white">
                      {i + 1}
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

                  <div className="mt-8 flex-1 space-y-6 border border-ink/15 bg-white p-6">
                    {phase.groups.map((group) => (
                      <div key={group.label ?? group.items[0]}>
                        {group.label && (
                          <p className="mb-2 border-b border-ink/10 pb-1 text-sm font-bold text-navy">
                            {group.label}
                          </p>
                        )}
                        <ul className="space-y-1.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm leading-relaxed text-ink/80"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
