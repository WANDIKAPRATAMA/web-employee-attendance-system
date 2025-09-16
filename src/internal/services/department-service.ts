// department-service.ts

import { ZodError, ZodSafeParseResult } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
import {
  CreateDepartmentRequest,
  DepartmentResponse,
  UpdateDepartmentRequest,
  DeleteDepartmentResponse,
  GetDepartmentsRequest,
  GetDepartmentsResponse,
  AssignmentDepartmentRequest,
  AssignmentDepartmentResponse,
} from "../validations/department-validation";

export async function createDepartmentRest(
  payload: ZodSafeParseResult<CreateDepartmentRequest>,
  token: string
): Promise<APIResponse<DepartmentResponse | null>> {
  try {
    return apiFetch<DepartmentResponse>(
      "/departments",
      "POST",
      { Authorization: `Bearer ${token}` },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<DepartmentResponse>(error);
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

export async function getDepartmentRest(
  id: string,
  token: string
): Promise<APIResponse<DepartmentResponse | null>> {
  try {
    return apiFetch<DepartmentResponse>(
      `/departments/${id}`,
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<DepartmentResponse>(error);
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

export async function updateDepartmentRest(
  id: string,
  payload: ZodSafeParseResult<UpdateDepartmentRequest>,
  token: string
): Promise<APIResponse<DepartmentResponse | null>> {
  try {
    return apiFetch<DepartmentResponse>(
      `/departments/${id}`,
      "PUT",
      { Authorization: `Bearer ${token}` },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<DepartmentResponse>(error);
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

export async function deleteDepartmentRest(
  id: string,
  token: string
): Promise<APIResponse<DeleteDepartmentResponse | null>> {
  try {
    return apiFetch<DeleteDepartmentResponse>(
      `/departments/${id}`,
      "DELETE",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<DeleteDepartmentResponse>(error);
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

export async function getDepartmentsRest(
  payload: ZodSafeParseResult<GetDepartmentsRequest>,
  token: string
): Promise<APIResponse<GetDepartmentsResponse | null>> {
  try {
    const query = new URLSearchParams();
    if (payload?.data?.page) query.append("page", payload.data.page.toString());
    if (payload?.data?.limit)
      query.append("limit", payload.data.limit.toString());

    const path = `/departments${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    return apiFetch<GetDepartmentsResponse>(
      path,
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<GetDepartmentsResponse>(error);
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

export async function assignDepartmentRest(
  payload: ZodSafeParseResult<AssignmentDepartmentRequest>,
  token: string
): Promise<APIResponse<AssignmentDepartmentResponse | null>> {
  try {
    return apiFetch<AssignmentDepartmentResponse>(
      "/departments/assignment",
      "POST",
      { Authorization: `Bearer ${token}` },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<AssignmentDepartmentResponse>(error);
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
