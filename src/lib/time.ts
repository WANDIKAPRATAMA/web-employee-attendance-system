import { formatInTimeZone } from "date-fns-tz";
export const formatIndoTime = (date: string | Date) => {
  const timeZone = "Asia/Jakarta";
  return formatInTimeZone(date, timeZone, "HH:mm:ss");
};
