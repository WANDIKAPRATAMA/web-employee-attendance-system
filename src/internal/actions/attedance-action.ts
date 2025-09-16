// attendance-action.ts

import { newAttendanceController } from "../controllers/attedance-controller";
import {
  AttendanceResponse,
  GetAttendanceLogsRequest,
  GetAttendanceLogsResponse,
} from "../validations/attedance-validation";

export async function clockInAction(
  token: string
): Promise<APIResponse<AttendanceResponse | null>> {
  const repo = newAttendanceController();
  return repo.clockIn(token);
}

export async function clockOutAction(
  token: string
): Promise<APIResponse<AttendanceResponse | null>> {
  const repo = newAttendanceController();
  return repo.clockOut(token);
}

export async function getAttendanceLogsAction(
  data: GetAttendanceLogsRequest,
  token: string
): Promise<APIResponse<GetAttendanceLogsResponse | null>> {
  const repo = newAttendanceController();
  return repo.getAttendanceLogs(data, token);
}
