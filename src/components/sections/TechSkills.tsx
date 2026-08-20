import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { accentText } from "@/lib/accent";
import type { TechPhase } from "@/lib/content/types";

export function TechSkills({ phases }: { phases: TechPhase[] }) {
  return (
    <section className="bg-white">
      <Container>
        <div className="py-16 sm:py-20">
          <p className="max-w-3xl text-lg leading-8 text-ink/80">
            자동화시스템을 <strong className="text-navy">분석·설계</strong>부터{" "}
            <strong className="text-navy">개발·제작</strong>,{" "}
            <strong className="text-navy">설치·시운전·교육</strong>까지 하나의
            흐름으로 책임지고 종합적인 서비스를 제공합니다.
          </p>

          {/* Stepper: 전체 수행 흐름 */}
          <ol className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            {phases.map((phase, i) => (
              <li key={phase.title} className="flex items-center gap-3 sm:flex-1">
                <div className="w-full bg-concrete p-5">
                  <BrandLine className="mb-4" />
                  <span className="font-mono text-2xl font-extrabold text-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-lg font-extrabold text-navy">
                    {phase.title}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-steel">
                    {phase.titleEn}
                  </p>
                </div>
                {i < phases.length - 1 && (
                  <span
                    className="shrink-0 text-2xl font-bold text-orange"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          {/* 단계별 상세 */}
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {phases.map((phase, i) => (
              <div key={phase.title} className="flex flex-col bg-white">
                <BrandLine />
                <div className="flex flex-col border-2 border-t-0 border-ink/10 p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-extrabold text-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-extrabold text-navy">
                      {phase.title}
                    </h3>
                  </div>

                  <div className="mt-6 space-y-5">
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
                              className="flex gap-2 text-sm leading-6 text-ink/80"
                            >
                              <span
                                className={`mt-2 h-1.5 w-1.5 shrink-0 ${accentText[phase.accent] === "text-orange" ? "bg-orange" : "bg-navy"}`}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
