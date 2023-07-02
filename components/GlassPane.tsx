import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const GlassPane = ({ children, className }: Props) => {
  return <div className={clsx("glass rounded-2xl border-solid border-2 border-gray-200", className)}>{children}</div>;
};

export default GlassPane;
