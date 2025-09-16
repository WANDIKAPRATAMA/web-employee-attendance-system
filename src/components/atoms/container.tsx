// components/layout/Container.tsx
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "sm" | "md" | "lg" | "xl" | "full" | "screen";
};

const Container = ({ className, size = "md", ...props }: ContainerProps) => {
  const sizeClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
    screen: "@container/main flex flex-1 flex-col gap-2",
  };

  return (
    <div
      className={twMerge("w-full mx-auto", sizeClasses[size], className)}
      {...props}
    />
  );
};

export default Container;
