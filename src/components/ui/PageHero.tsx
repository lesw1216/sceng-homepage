import type { ReactNode } from "react";
import { Container } from "./Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** 제목과 같은 행 오른쪽에 배치할 액션 (예: 목록으로 돌아가기) */
  action?: ReactNode;
}

/** 서브 페이지 상단 타이틀 밴드 */
export function PageHero({ eyebrow, title, description, action }: PageHeroProps) {
  return (
    <section className="bg-white">
      <Container>
        <div className="pb-8 pt-16 sm:pt-20">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-orange">
              {eyebrow}
            </span>
            <span className="h-px w-12 bg-orange" aria-hidden="true" />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
              {title}
            </h1>
            {action}
          </div>
          {description && (
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/70">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
