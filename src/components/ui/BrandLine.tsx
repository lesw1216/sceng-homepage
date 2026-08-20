interface BrandLineProps {
  className?: string;
  /** 세로선 여부 (기본 가로선) */
  vertical?: boolean;
}

/**
 * 브랜드 라인 — 로고 규칙(오렌지:네이비 = 2:1, 두 색 경계를 "/" 형태 간격으로 분리).
 * 프로젝트의 모든 주요 구획선(섹션 구분·헤더/푸터 경계·카드 상단 바)에 사용한다.
 * (see .claude/rules/design-system.md)
 */
const HORIZONTAL =
  "linear-gradient(100deg, var(--color-orange) 0 63%, transparent 63% 68%, var(--color-navy) 68% 100%)";
const VERTICAL =
  "linear-gradient(190deg, var(--color-orange) 0 63%, transparent 63% 68%, var(--color-navy) 68% 100%)";

export function BrandLine({ className = "", vertical = false }: BrandLineProps) {
  return (
    <span
      aria-hidden="true"
      className={`block ${vertical ? "w-[3px]" : "h-[3px] w-full"} ${className}`}
      style={{ backgroundImage: vertical ? VERTICAL : HORIZONTAL }}
    />
  );
}
