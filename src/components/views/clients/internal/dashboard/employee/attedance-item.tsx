import { DepartmentResponse } from "@/internal/validations/department-validation";
import {
  parseISO,
  isBefore,
  differenceInMinutes,
  isAfter,
  format,
} from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  AlertTriangle,
  TrendingUp,
  LogIn,
  LogOut,
} from "lucide-react";
import { analyzePunctuality } from "./anylize";

// Attendance History Item Component
export function AttendanceHistoryItem({
  record,
  department,
}: {
  record: any;
  department: DepartmentResponse;
}) {
  const analysis = analyzePunctuality(
    record,
    department,
    record.attendance_type
  );

  return (
    <div className="flex items-center p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      <div
        className={`p-3 rounded-full mr-4 ${
          record.attendance_type === "in"
            ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
            : "bg-blue-100 dark:blue-green-900/20 text-blue-600 dark:text-blue-400"
        }`}
      >
        {record.attendance_type === "in" ? (
          <LogIn className="h-5 w-5" />
        ) : (
          <LogOut className="h-5 w-5" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none truncate">
          {format(parseISO(record.date_attendance), "EEEE, dd MMMM yyyy", {
            locale: id,
          })}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {format(parseISO(record.date_attendance), "HH:mm:ss", { locale: id })}
        </p>
        <div className="flex items-center mt-1">
          {analysis.icon}
          <span
            className={`text-xs ml-1 ${
              analysis.status === "on-time"
                ? "text-green-600"
                : analysis.status === "late"
                ? "text-amber-600"
                : analysis.status === "early"
                ? "text-blue-600"
                : "text-muted-foreground"
            }`}
          >
            {analysis.message}
          </span>
        </div>
      </div>

      <div className="ml-4 flex flex-col items-end">
        <Badge
          variant={record.attendance_type === "in" ? "default" : "secondary"}
          className={
            record.attendance_type === "in"
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          }
        >
          {record.attendance_type === "in" ? "IN" : "OUT"}
        </Badge>

        <div
          className={`text-xs mt-1 ${
            analysis.status === "on-time"
              ? "text-green-600"
              : analysis.status === "late"
              ? "text-amber-600"
              : analysis.status === "early"
              ? "text-blue-600"
              : "text-muted-foreground"
          }`}
        >
          {record.attendance_type === "in"
            ? `Deadline: ${format(
                parseISO(department.max_clock_in_time),
                "HH:mm"
              )}`
            : `Deadline: ${format(
                parseISO(department.max_clock_out_time),
                "HH:mm"
              )}`}
        </div>
      </div>
    </div>
  );
}
