import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "yellow";
type ButtonSize = "sm" | "md" | "lg";

interface SharedProps {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

type ButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "size"> & {
    href?: undefined;
  };

type LinkProps = SharedProps & {
  href: ComponentPropsWithoutRef<typeof Link>["href"];
};

export type BrutalistButtonProps = ButtonProps | LinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-cyan text-ink hover:bg-ink hover:text-white",
  secondary: "bg-white text-ink hover:bg-neutral",
  yellow: "bg-yellow text-ink hover:bg-ink hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-[11px]",
  md: "min-h-11 px-4 text-xs",
  lg: "min-h-13 px-5 text-sm",
};

export function BrutalistButton(props: BrutalistButtonProps) {
  const {
    children,
    className = "",
    size = "md",
    variant = "primary",
    href,
    ...buttonProps
  } = props;
  const classes = `inline-flex items-center justify-center border-2 border-border font-ui font-semibold tracking-[0.06em] transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...buttonProps}>
      {children}
    </button>
  );
}
