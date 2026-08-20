import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionTone = "light" | "concrete" | "navy" | "graphite";

interface SectionProps {
  id: string;
  /** 섹션 번호 (예: "01") */
  index?: string;
  /** 섹션 상단 소제목(영문 라벨) */
  eyebrow?: string;
  /** 섹션 제목 */
  title?: string;
  /** 제목 아래 설명 */
  description?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

const toneConfig: Record<
  SectionTone,
  { bg: string; dark: boolean }
> = {
  light: { bg: "bg-white", dark: false },
  concrete: { bg: "bg-concrete", dark: false },
  navy: { bg: "bg-navy", dark: true },
  graphite: { bg: "bg-graphite", dark: true },
};

/** 앵커 스크롤 대상 섹션. 넘버 + 모노 라벨 + 오렌지 바로 인더스트리얼 헤더를 구성. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  tone = "light",
  className = "",
  children,
}: SectionProps) {
  const { bg, dark } = toneConfig[tone];
  const labelColor = dark ? "text-white/50" : "text-steel";
  const titleColor = dark ? "text-white" : "text-navy";
  const descColor = dark ? "text-white/70" : "text-ink/70";

  return (
    <section
      id={id}
      className={`scroll-mt-16 py-20 sm:py-28 ${bg} ${className}`}
    >
      <Container>
        {(eyebrow || title || description || index) && (
          <header className="mb-12 max-w-4xl sm:mb-16">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1.5 bg-orange" aria-hidden="true" />
              {index && (
                <span className="font-mono text-sm font-bold text-orange">
                  {index}
                </span>
              )}
              {eyebrow && (
                <span
                  className={`font-mono text-xs font-semibold uppercase tracking-[0.25em] ${labelColor}`}
                >
                  {eyebrow}
                </span>
              )}
            </div>
            {title && (
              <h2
                className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${titleColor}`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className={`mt-4 text-base leading-8 sm:text-lg ${descColor}`}>
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
