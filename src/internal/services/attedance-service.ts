// attendance-service.ts

import { ZodError, ZodSafeParseResult } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
import {
  AttendanceResponse,
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
