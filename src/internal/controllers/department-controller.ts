// department-controller.ts

import { DepartmentInterface } from "../interface/department-interface";
import {
  createDepartmentRest,
  getDepartmentRest,
  updateDepartmentRest,
  deleteDepartmentRest,
  getDepartmentsRest,
  assignDepartmentRest,
} from "../services/department-service";
import { handleZodError } from "../utils/fetch";
import {
  CreateDepartmentRequest,
  DepartmentResponse,
  CreateDepartmentRequestSchema,
  UpdateDepartmentRequest,
  UpdateDepartmentRequestSchema,
  DeleteDepartmentResponse,
  GetDepartmentsRequest,
  GetDepartmentsResponse,
  GetDepartmentsRequestSchema,
  AssignmentDepartmentRequest,
  AssignmentDepartmentResponse,
  AssignmentDepartmentRequestSchema,
} from "../validations/department-validation";

export class RestDepartmentController implements DepartmentInterface {
  async createDepartment(
    data: CreateDepartmentRequest,
    token: string
  ): Promise<APIResponse<DepartmentResponse | null>> {
    const parsed = CreateDepartmentRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<DepartmentResponse>(parsed.error);
    }

    return createDepartmentRest(parsed, token);
  }

  async getDepartment(
    id: string,
    token: string
  ): Promise<APIResponse<DepartmentResponse | null>> {
    return getDepartmentRest(id, token);
  }

  async updateDepartment(
    id: string,
    data: UpdateDepartmentRequest,
    token: string
  ): Promise<APIResponse<DepartmentResponse | null>> {
    const parsed = UpdateDepartmentRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<DepartmentResponse>(parsed.error);
    }

    return updateDepartmentRest(id, parsed, token);
  }

  async deleteDepartment(
    id: string,
    token: string
  ): Promise<APIResponse<DeleteDepartmentResponse | null>> {
    return deleteDepartmentRest(id, token);
  }

  async getDepartments(
    data: GetDepartmentsRequest,
    token: string
  ): Promise<APIResponse<GetDepartmentsResponse | null>> {
    const parsed = GetDepartmentsRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<GetDepartmentsResponse>(parsed.error);
    }

    return getDepartmentsRest(parsed, token);
  }

  async assignDepartment(
    data: AssignmentDepartmentRequest,
    token: string
  ): Promise<APIResponse<AssignmentDepartmentResponse | null>> {
    const parsed = AssignmentDepartmentRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<AssignmentDepartmentResponse>(parsed.error);
    }

    return assignDepartmentRest(parsed, token);
  }
}

export function newDepartmentController(): DepartmentInterface {
  // if (process.env.MODE === "supabase") return new SupabaseDepartmentController();
  return new RestDepartmentController();
}
