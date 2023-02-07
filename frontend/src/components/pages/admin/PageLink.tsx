import React, { HTMLProps } from "react";
import cn from "classnames";
/* eslint-disable react/jsx-props-no-spreading */

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({
  className,
  active,
  disabled,
  children,
  ...otherProps
}: Props) {
  const customClassName = cn("page-link", className, {
    active,
    disabled,
  });

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a
      className={customClassName}
      aria-current={active ? "page" : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );
}
