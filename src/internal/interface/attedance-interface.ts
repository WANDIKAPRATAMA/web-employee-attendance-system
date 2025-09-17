// attendance-interface.ts

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

export interface AttendanceInterface {
  clockIn: (token: string) => Promise<APIResponse<AttendanceResponse | null>>;
  clockOut: (token: string) => Promise<APIResponse<AttendanceResponse | null>>;
  getAttendanceLogs: (
    data: GetAttendanceLogsRequest,
    token: string
  ) => Promise<APIResponse<GetAttendanceLogsResponse | null>>;

  getAttendanceHistory: (
    data: GetAttendanceHistoryRequest,
    token: string
  ) => Promise<APIResponse<GetAttendanceHistoryResponse | null>>;
  getAdminDashboard: (
    data: AdminDashboardRequest,
    token: string
  ) => Promise<APIResponse<AdminDashboardResponse | null>>;
  checkCurrentStatus: (
    data: CheckCurrentStatusRequest,
    token: string
  ) => Promise<APIResponse<CurrentStatusResponse | null>>;
}
