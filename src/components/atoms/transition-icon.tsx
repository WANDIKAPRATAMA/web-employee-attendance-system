import { memo } from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type TransitionIconProps = PendingProps &
  ChildrenProps & {
    className?: string; // Add className prop
    customComponent?: React.ReactNode;
  };
export const TransitionIcon = memo(
  ({
    isPending,
    children,
    customComponent,
    className,
  }: TransitionIconProps) => (
    <>
      {isPending ? (
        customComponent ? (
          customComponent
        ) : (
          <Loader className={cn("h-4 w-4 animate-spin", className)} />
        )
      ) : (
        children
      )}
    </>
  )
);
