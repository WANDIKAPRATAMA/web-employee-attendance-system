// attendance-controller.ts

import { AttendanceInterface } from "../interface/attedance-interface";
import {
  checkCurrentStatusRest,
  clockInRest,
  clockOutRest,
  getAdminDashboardRest,
  getAttendanceHistoryRest,
  getAttendanceLogsRest,
} from "../services/attedance-service";
import { handleZodError } from "../utils/fetch";
import {
  AttendanceResponse,
  ClockInRequestSchema,
  ClockOutRequestSchema,
  GetAttendanceLogsRequest,
  GetAttendanceLogsResponse,
  GetAttendanceLogsRequestSchema,
  AdminDashboardRequest,
  AdminDashboardRequestSchema,
  AdminDashboardResponse,
  GetAttendanceHistoryRequest,
  GetAttendanceHistoryRequestSchema,
  GetAttendanceHistoryResponse,
  CheckCurrentStatusRequest,
  CheckCurrentStatusRequestSchema,
  CurrentStatusResponse,
} from "../validations/attedance-validation";

export class RestAttendanceController implements AttendanceInterface {
  async clockIn(
    token: string
  ): Promise<APIResponse<AttendanceResponse | null>> {
    const parsed = ClockInRequestSchema.safeParse({});
    if (!parsed.success) {
      return handleZodError<AttendanceResponse>(parsed.error);
    }

    return clockInRest(token);
  }

  async clockOut(
    token: string
  ): Promise<APIResponse<AttendanceResponse | null>> {
    const parsed = ClockOutRequestSchema.safeParse({});
    if (!parsed.success) {
      return handleZodError<AttendanceResponse>(parsed.error);
    }

    return clockOutRest(token);
  }

  async getAttendanceLogs(
    data: GetAttendanceLogsRequest,
    token: string
  ): Promise<APIResponse<GetAttendanceLogsResponse | null>> {
    const parsed = GetAttendanceLogsRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<GetAttendanceLogsResponse>(parsed.error);
    }

    return getAttendanceLogsRest(parsed, token);
  }

  async getAttendanceHistory(
    data: GetAttendanceHistoryRequest,
    token: string
  ): Promise<APIResponse<GetAttendanceHistoryResponse | null>> {
    const parsed = GetAttendanceHistoryRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<GetAttendanceHistoryResponse>(parsed.error);
    }

    return getAttendanceHistoryRest(parsed, token);
  }

  async getAdminDashboard(
    data: AdminDashboardRequest,
    token: string
  ): Promise<APIResponse<AdminDashboardResponse | null>> {
    const parsed = AdminDashboardRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<AdminDashboardResponse>(parsed.error);
    }

    return getAdminDashboardRest(parsed, token);
  }
  async checkCurrentStatus(
    data: CheckCurrentStatusRequest,
    token: string
  ): Promise<APIResponse<CurrentStatusResponse | null>> {
    const parsed = CheckCurrentStatusRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<CurrentStatusResponse>(parsed.error);
    }

    return checkCurrentStatusRest(parsed, token);
  }
}

export function newAttendanceController(): AttendanceInterface {
  return new RestAttendanceController();
}
