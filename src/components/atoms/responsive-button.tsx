import {
  FilePlus,
  Save,
  FolderPlus,
  CalendarIcon,
  PlusIcon,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { memo } from "react";

type ResponsiveButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    icon: React.ReactNode;
    hoverContent?: React.ReactNode;
  };

export const ResponsiveButton = ({
  children,
  icon,
  hoverContent,
  asChild,

  ...props
}: ResponsiveButtonProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild={asChild}>
        <Button {...props} asChild={asChild} className="cursor-pointer">
          <span className="hidden md:inline">{children}</span>
          <span className="md:hidden">{icon}</span>
        </Button>
      </HoverCardTrigger>
      {hoverContent && (
        <HoverCardContent className="w-80">{hoverContent}</HoverCardContent>
      )}
    </HoverCard>
  );
};

export const SaveButton = memo(({ isPending }: { isPending: boolean }) => (
  <ResponsiveButton
    variant="default"
    size={"sm"}
    disabled={isPending}
    icon={<Save className="h-4 w-4" />}
    hoverContent={
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">
          {isPending ? "Saving in progress..." : "Save Document"}
        </h4>
        <p className="text-sm">
          {isPending
            ? "Please wait while we save your changes"
            : "Save all current changes to this document"}
        </p>
      </div>
    }
  >
    {isPending ? "Saving..." : "Save"}
  </ResponsiveButton>
));
