import type { HTMLAttributes, ReactNode } from "react";

type PanelPadding = "none" | "sm" | "md" | "lg";

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  padding?: PanelPadding;
}

const paddingClasses: Record<PanelPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Panel({
  children,
  className = "",
  padding = "md",
  ...props
}: PanelProps) {
  return (
    <section
      className={`border-2 border-border bg-white ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
