interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/** 섹션 제목 (오렌지 바 + 모노 라벨 + 제목). 구분선은 넣지 않는다. */
export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="max-w-4xl">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-orange">
          {eyebrow}
        </span>
        <span className="h-px w-12 bg-orange" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-ink/80">
          {description}
        </p>
      )}
    </header>
  );
}
