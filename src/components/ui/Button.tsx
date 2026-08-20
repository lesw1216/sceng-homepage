import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  /** 외부 링크(새 탭 + rel) 여부 */
  external?: boolean;
  className?: string;
  children: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-orange text-white hover:bg-orange/90",
  secondary: "bg-navy text-white hover:bg-navy-700",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

/** 링크형 버튼. 색은 팔레트 토큰만 사용. */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...externalProps}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors ${variantClass[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
