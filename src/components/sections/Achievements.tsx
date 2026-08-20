import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { Achievement } from "@/lib/content/types";

export function Achievements({ items }: { items: Achievement[] }) {
  return (
    <Section
      id="achievements"
      tone="mist"
      eyebrow="Track Record"
      title="실적현황"
      description="주요 프로젝트 수행 실적입니다."
    >
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-steel/40 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-navy">
            실적 자료를 준비 중입니다.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-ink/60">
            주요 프로젝트 수행 실적은 곧 업데이트될 예정입니다. 자세한 수행
            이력이 필요하시면 문의해 주시기 바랍니다.
          </p>
          <div className="mt-6">
            <ButtonLink href="#contact" variant="secondary">
              실적 문의하기
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.slug}
              className="flex flex-col rounded-2xl border border-steel/15 bg-white p-7"
            >
              {item.category && (
                <span className="w-fit rounded-full bg-sand px-3 py-1 text-xs font-semibold text-orange">
                  {item.category}
                </span>
              )}
              <h3 className="mt-3 text-lg font-bold text-navy">{item.title}</h3>
              <p className="mt-1 text-xs text-ink/50">{item.date}</p>
              <p className="mt-3 text-sm leading-6 text-ink/75">
                {item.summary}
              </p>
              {item.metrics.length > 0 && (
                <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-steel/15 pt-5">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-xs text-ink/50">{metric.label}</dt>
                      <dd className="mt-1 text-base font-bold text-orange">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
