import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  id: string;
  /** 섹션 상단 소제목(영문 라벨) */
  eyebrow?: string;
  /** 섹션 제목 */
  title?: string;
  /** 제목 아래 설명 */
  description?: string;
  /** 배경 톤 */
  tone?: "white" | "mist";
  className?: string;
  children: ReactNode;
}

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "bg-white",
  mist: "bg-mist",
};

/** 앵커 스크롤 대상이 되는 페이지 섹션. 헤더 높이만큼 scroll-margin 확보. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  tone = "white",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-24 ${toneClass[tone]} ${className}`}
    >
      <Container>
        {(eyebrow || title || description) && (
          <header className="mb-10 max-w-3xl sm:mb-14">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg leading-8 text-ink/70">{description}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
