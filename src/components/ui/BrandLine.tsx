interface BrandLineProps {
  className?: string;
  /** 세로선 여부 (기본 가로선) */
  vertical?: boolean;
}

/**
 * 브랜드 라인 — 로고 규칙(오렌지:네이비 = 2:1, 두 색 경계를 "/" 형태로 분리).
 * 경계 간격은 2px로 좁게 유지한다. (see .claude/rules/design-system.md)
 * flex 2:1 + 2px gap + skew로 사선 간격을 만들고, overflow-hidden으로 끝을 정리한다.
 */
export function BrandLine({ className = "", vertical = false }: BrandLineProps) {
  return (
    <span
      aria-hidden="true"
      className={`block overflow-hidden ${vertical ? "h-full w-[3px]" : "h-[3px] w-full"} ${className}`}
    >
      <span
        className={`flex h-full w-full gap-[2px] ${vertical ? "flex-col" : ""}`}
        style={{ transform: vertical ? "skewY(-20deg)" : "skewX(-20deg)" }}
      >
        <span className="flex-[2] bg-orange" />
        <span className="flex-1 bg-navy" />
      </span>
    </span>
  );
}
