import { cn } from "@/lib/utils";
import { ReactNode, ComponentPropsWithoutRef } from "react";
import NextLink from "next/link";
// Base typography props

type TypographyProps = {
  children: ReactNode;
  className?: string;
  unsize?: boolean;
};

// Title component - scales from mobile to desktop
const Title = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1
      className={cn(
        "font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100",
        !unsize && [
          "text-4xl",
          "sm:text-5xl sm:leading-tight",
          "lg:text-6xl lg:leading-tight",
        ],
        "min-w-0 break-words",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

const Subtitle = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & ComponentPropsWithoutRef<"h2">) => {
  return (
    <h2
      className={cn(
        "font-semibold leading-snug tracking-tight text-gray-800 dark:text-gray-200",
        !unsize && [
          "text-2xl",
          "sm:text-3xl sm:leading-snug",
          "lg:text-4xl lg:leading-normal",
        ],
        "min-w-0 break-words whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

const Description = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & ComponentPropsWithoutRef<"p">) => {
  return (
    <p
      className={cn(
        "leading-relaxed tracking-normal text-gray-600 dark:text-gray-400",
        !unsize && ["text-lg", "sm:text-xl sm:leading-relaxed"],
        "min-w-0 break-words whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

const Paragraph = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & ComponentPropsWithoutRef<"p">) => {
  return (
    <p
      className={cn(
        "leading-relaxed tracking-normal text-gray-700 dark:text-gray-300",
        !unsize && "text-base sm:leading-relaxed",
        "min-w-0 break-words whitespace-pre-wrap",
        "max-w-prose",
        "[&:not(:first-child)]:mt-4",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

const Link = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & any) => {
  return (
    <NextLink
      className={cn(
        "font-medium leading-normal text-primary-600 underline-offset-4 hover:underline",
        !unsize && ["text-base", "sm:text-base"],
        "inline-flex items-center whitespace-pre-wrap",
        "transition-colors duration-200 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};

const Label = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & ComponentPropsWithoutRef<"span">) => {
  return (
    <span
      className={cn(
        "font-medium leading-tight tracking-wide text-gray-500",
        !unsize && ["text-sm", "sm:text-sm"],
        "inline-block whitespace-pre-wrap",
        "dark:text-gray-400",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

const Small = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & ComponentPropsWithoutRef<"small">) => {
  return (
    <small
      className={cn(
        "font-normal leading-normal tracking-normal text-gray-500 dark:text-gray-400",
        !unsize && ["text-xs", "sm:text-sm sm:leading-normal"],
        "inline-block min-w-0 break-words whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      {children}
    </small>
  );
};

const StickyHeader = ({
  children,
  className,
  unsize,
  ...props
}: TypographyProps & ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1
      className={cn(
        "sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-4 backdrop-blur-lg shadow-sm",
        "sm:p-6",
        "font-bold leading-tight tracking-tight",
        !unsize && [
          "text-2xl",
          "sm:text-3xl sm:leading-tight",
          "lg:text-4xl lg:leading-tight",
        ],
        "min-w-0 break-words whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

// Compose the Typography component
export const Typography = {
  Title,
  Subtitle,
  Description,
  Paragraph,
  Link,
  Label,
  Small,
  StickyHeader,
};
//Example Use <Typography.Title className="text-5xl">Custom Size</Typography.Title>
export type Typography = typeof Typography;
