import { Section } from "@/components/ui/Section";
import { accentBg, accentText } from "@/lib/accent";
import type { TechPhase } from "@/lib/content/types";

export function TechSkills({ phases }: { phases: TechPhase[] }) {
  return (
    <Section
      id="tech"
      tone="mist"
      eyebrow="Technical Skills"
      title="보유기술"
      description="자동화시스템을 분석·설계부터 개발·제작, 설치·시운전까지 종합적으로 제공합니다."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {phases.map((phase) => (
          <div
            key={phase.title}
            className="flex flex-col rounded-2xl bg-white p-7 shadow-sm"
          >
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold text-white ${accentBg[phase.accent]}`}
            >
              {phase.titleEn}
            </span>
            <h3 className="mt-3 text-xl font-bold text-navy">{phase.title}</h3>

            <div className="mt-5 space-y-5">
              {phase.groups.map((group) => (
                <div key={group.label ?? group.items[0]}>
                  {group.label && (
                    <p
                      className={`text-sm font-semibold ${accentText[phase.accent]}`}
                    >
                      {group.label}
                    </p>
                  )}
                  <ul className="mt-2 space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-6 text-ink/75"
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-steel" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
