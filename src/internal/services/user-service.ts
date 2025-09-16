// user-service.ts

import { ZodError, ZodSafeParseResult } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
import {
  ListUsersRequest,
  ListUsersResponse,
  UpdateProfileRequest,
  ProfileResponse,
} from "../validations/user-validation";

export async function listUsersRest(
  payload: ZodSafeParseResult<ListUsersRequest>,
  token: string
): Promise<APIResponse<ListUsersResponse | null>> {
  try {
    const query = new URLSearchParams();
    if (payload?.data?.email) query.append("email", payload.data.email);
    if (payload?.data?.status) query.append("status", payload.data.status);
    if (payload?.data?.department_id)
      query.append("department_id", payload.data.department_id);
    if (payload?.data?.created_at_start)
      query.append("created_at_start", payload.data.created_at_start);
    if (payload?.data?.created_at_end)
      query.append("created_at_end", payload.data.created_at_end);
    if (payload?.data?.page) query.append("page", payload.data.page.toString());
    if (payload?.data?.limit)
      query.append("limit", payload.data.limit.toString());

    const path = `/users${query.toString() ? `?${query.toString()}` : ""}`;

    return apiFetch<ListUsersResponse>(
      path,
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ListUsersResponse>(error);
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

export async function updateProfileRest(
  payload: ZodSafeParseResult<UpdateProfileRequest>,
  token: string
): Promise<APIResponse<ProfileResponse | null>> {
  try {
    return apiFetch<ProfileResponse>(
      "/profile",
      "PUT",
      { Authorization: `Bearer ${token}` },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProfileResponse>(error);
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

export async function getProfileRest(
  token: string
): Promise<APIResponse<ProfileResponse | null>> {
  try {
    return apiFetch<ProfileResponse>(
      "/profile",
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProfileResponse>(error);
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
