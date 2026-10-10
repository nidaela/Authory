import type { HTMLAttributes } from "react";

export type StatusBadgeVariant = "neutral" | "active" | "success";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  variant?: StatusBadgeVariant;
}

const variantClasses: Record<StatusBadgeVariant, string> = {
  neutral: "bg-neutral text-ink",
  active: "bg-cyan text-ink",
  success: "bg-yellow text-ink",
};

export function StatusBadge({
  children,
  className = "",
  variant = "neutral",
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex border-2 border-border px-2 py-1 font-ui text-[10px] font-bold tracking-[0.08em] ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
