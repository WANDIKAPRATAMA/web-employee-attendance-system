import { DepartmentResponse } from "@/internal/validations/department-validation";
import { parseISO, isBefore, differenceInMinutes, isAfter } from "date-fns";
import { ThumbsUp, AlertTriangle, TrendingUp } from "lucide-react";

export function analyzePunctuality(
  record: any,
  department: DepartmentResponse,
  type: "in" | "out"
) {
  if (!record.date_attendance)
    return { status: "unknown", message: "No time recorded" };

  const recordTime = parseISO(record.date_attendance);
  const maxTimeStr =
    type === "in"
      ? department.max_clock_in_time
      : department.max_clock_out_time;

  // Extract time part from the ISO string (format: HH:mm:ss)
  const timePart = maxTimeStr.split("T")[1]?.split("+")[0] || maxTimeStr;
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Create a date object for comparison (using today's date)
  const maxTime = new Date();
  maxTime.setHours(hours, minutes, seconds, 0);

  if (type === "in") {
    if (
      isBefore(recordTime, maxTime) ||
      recordTime.getTime() === maxTime.getTime()
    ) {
      return {
        status: "on-time",
        message: "Arrived on time",
        icon: <ThumbsUp className="h-3 w-3 text-green-500" />,
      };
    } else {
      const minutesLate = differenceInMinutes(recordTime, maxTime);
      return {
        status: "late",
        message: `Late by ${minutesLate} minutes`,
        icon: <AlertTriangle className="h-3 w-3 text-amber-500" />,
      };
    }
  } else {
    if (
      isAfter(recordTime, maxTime) ||
      recordTime.getTime() === maxTime.getTime()
    ) {
      return {
        status: "on-time",
        message: "Left on time",
        icon: <ThumbsUp className="h-3 w-3 text-green-500" />,
      };
    } else {
      const minutesEarly = differenceInMinutes(maxTime, recordTime);
      return {
        status: "early",
        message: `Left early by ${minutesEarly} minutes`,
        icon: <TrendingUp className="h-3 w-3 text-blue-500" />,
      };
    }
  }
}
