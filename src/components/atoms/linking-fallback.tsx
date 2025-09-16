"use client";
import { useLinkStatus } from "next/link";
import { TransitionIcon } from "./transition-icon";
import React, { Suspense } from "react";

export function LinkingFallback({
  children,
  customComponent,
  className,
}: {
  children?: React.ReactNode;
  customComponent?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useLinkStatus();
  return (
    <TransitionIcon
      className={className}
      customComponent={customComponent}
      isPending={pending}
    >
      {children}
    </TransitionIcon>
  );
}
