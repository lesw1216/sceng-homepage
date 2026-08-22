import { BrandLine } from "./BrandLine";
import { Container } from "./Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/** 서브 페이지 상단 타이틀 밴드 (하단 브랜드 라인으로 본문과 구분) */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-white">
      <Container>
        <div className="py-20 sm:py-28">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-orange">
              {eyebrow}
            </span>
            <span className="h-px w-12 bg-orange" aria-hidden="true" />
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/70">
              {description}
            </p>
          )}
        </div>
      </Container>
      <BrandLine />
    </section>
  );
}
