import { DepartmentResponse } from "@/internal/validations/department-validation";
import { parseISO, differenceInMinutes, set } from "date-fns";
import { ThumbsUp, AlertTriangle, TrendingUp } from "lucide-react";

function getMaxTime(recordTime: Date, maxTimeStr: string): Date {
  let hours = 0,
    minutes = 0,
    seconds = 0;

  if (maxTimeStr.includes("T")) {
    const iso = parseISO(maxTimeStr);
    hours = iso.getUTCHours();
    minutes = iso.getUTCMinutes();
    seconds = iso.getUTCSeconds();
  } else {
    const [h, m, s] = maxTimeStr.split(":").map(Number);
    hours = h;
    minutes = m;
    seconds = s;
  }

  return set(recordTime, { hours, minutes, seconds, milliseconds: 0 });
}

export function analyzePunctuality(
  record: any,
  department: DepartmentResponse,
  type: "in" | "out"
) {
  if (!record.date_attendance) {
    return { status: "unknown", message: "No time recorded" };
  }

  const recordTime = parseISO(record.date_attendance);

  const maxTimeStr =
    type === "in"
      ? department.max_clock_in_time
      : department.max_clock_out_time;

  console.log("🚀 ~ analyzePunctuality ~ maxTimeStr:", maxTimeStr);

  const maxTime = getMaxTime(recordTime, maxTimeStr);

  console.log("🚀 ~ analyzePunctuality ~ maxTime:", maxTime);
  console.log("🚀 ~ analyzePunctuality ~ recordTime:", recordTime);

  if (type === "in") {
    if (recordTime <= maxTime) {
      return {
        status: "on-time",
        message: "Arrived on time",
        icon: <ThumbsUp className="h-3 w-3 text-green-500" />,
      };
    } else {
      const minutesLate = differenceInMinutes(recordTime, maxTime);
      console.log("🚀 ~ analyzePunctuality ~ minutesLate:", minutesLate);
      return {
        status: "late",
        message: `Late by ${minutesLate} minutes`,
        icon: <AlertTriangle className="h-3 w-3 text-amber-500" />,
      };
    }
  } else {
    if (recordTime >= maxTime) {
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
