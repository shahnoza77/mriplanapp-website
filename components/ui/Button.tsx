import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass";
  full?: boolean;
  className?: string;
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", full = false, className = "", ...rest } = props;
  const classes = ["btn", `btn-${variant}`, full ? "btn-full" : "", className].filter(Boolean).join(" ");

  if ("href" in rest && rest.href) {
  return (
    <Link className={classes} {...rest}>
        <span>{children}</span>
        <i aria-hidden="true" />
    </Link>
  );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
      <i aria-hidden="true" />
    </button>
  );
}
