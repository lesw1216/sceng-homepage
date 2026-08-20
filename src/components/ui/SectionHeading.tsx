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
    <header className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="h-7 w-1.5 bg-orange" aria-hidden="true" />
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-steel">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-8 text-ink/70">{description}</p>
      )}
    </header>
  );
}
