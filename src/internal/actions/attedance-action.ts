// attendance-action.ts

import { newAttendanceController } from "../controllers/attedance-controller";
import {
  AdminDashboardRequest,
  AdminDashboardResponse,
  AttendanceResponse,
  CheckCurrentStatusRequest,
  CurrentStatusResponse,
  GetAttendanceHistoryRequest,
  GetAttendanceHistoryResponse,
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

export async function getAttendanceHistoryAction(
  data: GetAttendanceHistoryRequest,
  token: string
): Promise<APIResponse<GetAttendanceHistoryResponse | null>> {
  const repo = newAttendanceController();
  return repo.getAttendanceHistory(data, token);
}

export async function getAdminDashboardAction(
  data: AdminDashboardRequest,
  token: string
): Promise<APIResponse<AdminDashboardResponse | null>> {
  const repo = newAttendanceController();
  return repo.getAdminDashboard(data, token);
}

export async function checkCurrentStatusAction(
  data: CheckCurrentStatusRequest,
  token: string
): Promise<APIResponse<CurrentStatusResponse | null>> {
  const repo = newAttendanceController();
  return repo.checkCurrentStatus(data, token);
}
