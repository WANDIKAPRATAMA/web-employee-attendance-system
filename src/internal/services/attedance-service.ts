// attendance-service.ts

import { ZodError, ZodSafeParseResult } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
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

export async function clockInRest(
  token: string
): Promise<APIResponse<AttendanceResponse | null>> {
  try {
    return apiFetch<AttendanceResponse>(
      "/attendance/clock-in",
      "POST",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<AttendanceResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function clockOutRest(
  token: string
): Promise<APIResponse<AttendanceResponse | null>> {
  try {
    return apiFetch<AttendanceResponse>(
      "/attendance/clock-out",
      "PUT",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<AttendanceResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function getAttendanceLogsRest(
  payload: ZodSafeParseResult<GetAttendanceLogsRequest>,
  token: string
): Promise<APIResponse<GetAttendanceLogsResponse | null>> {
  try {
    const query = new URLSearchParams();
    if (payload?.data?.date) query.append("date", payload.data.date);
    if (payload?.data?.department_id)
      query.append("department_id", payload.data.department_id);
    if (payload?.data?.page) query.append("page", payload.data.page.toString());
    if (payload?.data?.limit)
      query.append("limit", payload.data.limit.toString());

    const path = `/attendance/logs${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    return apiFetch<GetAttendanceLogsResponse>(
      path,
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<GetAttendanceLogsResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function getAttendanceHistoryRest(
  payload: ZodSafeParseResult<GetAttendanceHistoryRequest>,
  token: string
): Promise<APIResponse<GetAttendanceHistoryResponse | null>> {
  try {
    const query = new URLSearchParams();
    if (payload?.data?.user_id) query.append("user_id", payload.data.user_id);
    if (payload?.data?.page) query.append("page", payload.data.page.toString());
    if (payload?.data?.limit)
      query.append("limit", payload.data.limit.toString());

    const path = `/attendance/history${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    return apiFetch<GetAttendanceHistoryResponse>(
      path,
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<GetAttendanceHistoryResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function getAdminDashboardRest(
  payload: ZodSafeParseResult<AdminDashboardRequest>,
  token: string
): Promise<APIResponse<AdminDashboardResponse | null>> {
  try {
    const query = new URLSearchParams();
    if (payload?.data?.start_date)
      query.append("start_date", payload.data.start_date);
    if (payload?.data?.end_date)
      query.append("end_date", payload.data.end_date);

    const path = `/attendance/admin${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    return apiFetch<AdminDashboardResponse>(
      path,
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<AdminDashboardResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function checkCurrentStatusRest(
  payload: ZodSafeParseResult<CheckCurrentStatusRequest>,
  token: string
): Promise<APIResponse<CurrentStatusResponse | null>> {
  try {
    const query = new URLSearchParams();
    if (payload?.data?.user_id) query.append("user_id", payload.data.user_id);

    const path = `/attendance/current-status${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    return apiFetch<CurrentStatusResponse>(
      path,
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<CurrentStatusResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}
