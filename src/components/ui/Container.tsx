import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** 페이지 공통 가로 컨테이너. 넓은 max-width + 좁은 좌우 여백 (see .claude/rules/design-system.md) */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
