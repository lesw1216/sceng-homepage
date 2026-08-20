import { Section } from "@/components/ui/Section";
import { accentBg, accentText } from "@/lib/accent";
import type { TechPhase } from "@/lib/content/types";

export function TechSkills({ phases }: { phases: TechPhase[] }) {
  return (
    <Section
      id="tech"
      index="02"
      tone="concrete"
      eyebrow="Technical Skills"
      title="보유기술"
      description="자동화시스템을 분석·설계부터 개발·제작, 설치·시운전까지 종합적으로 제공합니다."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {phases.map((phase, i) => (
          <div
            key={phase.title}
            className="flex flex-col border-2 border-ink/10 bg-white"
          >
            <div className={`h-1.5 ${accentBg[phase.accent]}`} />
            <div className="flex flex-col p-7">
              <div className="flex items-baseline gap-3">
                <span
                  className={`font-mono text-2xl font-extrabold ${accentText[phase.accent]}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-navy">
                    {phase.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-steel">
                    {phase.titleEn}
                  </p>
                </div>
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
                            className={`mt-2 h-1.5 w-1.5 shrink-0 ${accentBg[phase.accent]}`}
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
    </Section>
  );
}
