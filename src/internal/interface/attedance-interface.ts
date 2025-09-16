// attendance-interface.ts

import {
  AttendanceResponse,
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
}
