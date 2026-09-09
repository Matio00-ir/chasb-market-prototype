import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-55 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white hover:bg-brand-600 focus-visible:outline-brand-500",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:outline-accent-500",
  outline:
    "border border-brand-700 text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-500",
  ghost:
    "text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-500",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
