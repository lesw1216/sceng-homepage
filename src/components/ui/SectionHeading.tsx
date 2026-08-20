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
        <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-orange">
          {eyebrow}
        </span>
        <span className="h-px w-12 bg-orange" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-navy sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/80 sm:text-xl">
          {description}
        </p>
      )}
    </header>
  );
}
