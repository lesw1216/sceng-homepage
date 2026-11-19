import type { MouseEvent, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** 외부 링크(새 탭 + rel) 여부 */
  external?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-orange text-white hover:bg-orange/90",
  secondary: "bg-navy text-white hover:bg-navy-700",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  ghost:
    "border-2 border-white bg-white/10 text-white hover:bg-white hover:text-navy",
};

// 헤더처럼 가로 폭이 빠듯한 곳은 sm으로 줄인다. 라벨 줄바꿈을 허용하려고 고정 높이 대신 min-h를 쓴다.
const sizeClass: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 py-2 text-base",
  sm: "min-h-10 px-4 py-1.5 text-sm leading-tight",
};

/** 링크형 버튼. 각진 형태 + 굵은 라벨로 인더스트리얼 톤. 색은 팔레트 토큰만. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  onClick,
  children,
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      onClick={onClick}
      {...externalProps}
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors ${sizeClass[size]} ${variantClass[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
