"use client";
import { Button } from "@/components/ui/button";
import {
  clockOutAction,
  clockInAction,
} from "@/internal/actions/attedance-action";
import { CurrentStatusResponse } from "@/internal/validations/attedance-validation";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { parseISO, format } from "date-fns";
import { LogOut, LogIn, Clock } from "lucide-react";
import { useTransition, useState, useCallback } from "react";
import { toast } from "sonner";

// Clock Button Component (Client Component)
export function ClockButton({
  status,
  token,
}: {
  status: CurrentStatusResponse;
  token: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [isClockedIn, setIsClockedIn] = useState(
    status.status === "Clocked In"
  );

  const handleClockAction = useCallback(() => {
    startTransition(async () => {
      try {
        if (isClockedIn) {
          const result = await clockOutAction(token);

          if (result.status === "success") {
            toast.success("Clock Out Successful", {
              description: `You have successfully clocked out at ${format(
                new Date(),
                "HH:mm"
              )}`,
              descriptionClassName: "text-muted-foreground",
            });
            setIsClockedIn(false);
          } else {
            toast.error("Clock Out Failed", {
              description: result.message || "Failed to clock out",
            });
          }
        } else {
          const result = await clockInAction(token);

          if (result.status === "success") {
            toast.success("Clock In Successful", {
              description: `You have successfully clocked in at ${format(
                new Date(),
                "HH:mm"
              )}`,
              descriptionClassName: "text-muted-foreground",
            });
            setIsClockedIn(true);
          } else {
            toast.error("Clock In Failed", {
              description: result.message || "Failed to clock in",
              descriptionClassName: "text-muted-foreground",
            });
          }
        }
      } catch (error) {
        toast.error("Error", {
          description: "An unexpected error occurred",
          descriptionClassName: "text-muted-foreground",
        });
      }
    });
  }, [isClockedIn, token]);

  const clockTime = isClockedIn ? status.clock_in : status.clock_out;
  const buttonText = isClockedIn ? "Clock Out" : "Clock In";
  const buttonIcon = isClockedIn ? (
    <LogOut className="h-4 w-4 mr-2" />
  ) : (
    <LogIn className="h-4 w-4 mr-2" />
  );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          onClick={handleClockAction}
          disabled={isPending}
          variant={isClockedIn ? "outline" : "default"}
          className="w-full transition-all duration-300"
        >
          {isPending ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Processing...
            </div>
          ) : (
            <>
              {buttonIcon}
              {buttonText}
            </>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center">
            {isClockedIn ? (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Clock Out
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Clock In
              </>
            )}
          </h4>
          <p className="text-sm">
            {isClockedIn
              ? "Click to record your clock out time"
              : "Click to record your clock in time"}
          </p>
          {clockTime && (
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last: {format(parseISO(clockTime), "dd MMM yyyy HH:mm")}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
