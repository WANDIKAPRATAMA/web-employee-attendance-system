import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CurrentStatusResponse } from "@/internal/validations/attedance-validation";
import { parseISO, format } from "date-fns";
import { Clock, CheckCircle, XCircle, LogIn } from "lucide-react";

// Status Card Component
export function StatusCard({ status }: { status: CurrentStatusResponse }) {
  const isClockedIn = status.status === "Clocked In";

  return (
    <Card className="relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${
          isClockedIn
            ? "bg-green-100 dark:bg-green-900/20"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      ></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium">Current Status</CardTitle>
        <div
          className={`p-2 rounded-full ${
            isClockedIn
              ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          }`}
        >
          <Clock className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold mb-1">
          <Badge
            variant={isClockedIn ? "default" : "secondary"}
            className={`text-sm ${
              isClockedIn
                ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                : ""
            }`}
          >
            {isClockedIn ? (
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Working
              </div>
            ) : (
              <div className="flex items-center">
                <XCircle className="h-3 w-3 mr-1" />
                Not Active
              </div>
            )}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground flex items-center">
          {status.clock_in ? (
            <>
              <LogIn className="h-3 w-3 mr-1" />
              In: {format(parseISO(status.clock_in), "HH:mm")}
            </>
          ) : (
            "No clock in recorded"
          )}
        </p>
      </CardContent>
    </Card>
  );
}
