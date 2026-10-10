import type { HTMLAttributes } from "react";

export interface SectionLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

export function SectionLabel({ children, className = "", ...props }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex border-2 border-border bg-yellow px-2 py-1 font-ui text-[10px] font-bold tracking-[0.12em] text-ink ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
