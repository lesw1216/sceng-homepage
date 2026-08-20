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
        <div className="py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <span className="h-7 w-1.5 bg-orange" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-steel">
              {eyebrow}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/70">
              {description}
            </p>
          )}
        </div>
      </Container>
      <BrandLine />
    </section>
  );
}
