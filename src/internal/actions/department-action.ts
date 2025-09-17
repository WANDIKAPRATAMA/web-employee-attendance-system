"use server";
import { newDepartmentController } from "../controllers/department-controller";
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

export async function createDepartmentAction(
  data: CreateDepartmentRequest,
  token: string
): Promise<APIResponse<DepartmentResponse | null>> {
  const repo = newDepartmentController();
  return repo.createDepartment(data, token);
}

export async function getDepartmentAction(
  id: string,
  token: string
): Promise<APIResponse<DepartmentResponse | null>> {
  const repo = newDepartmentController();
  return repo.getDepartment(id, token);
}

export async function updateDepartmentAction(
  id: string,
  data: UpdateDepartmentRequest,
  token: string
): Promise<APIResponse<DepartmentResponse | null>> {
  const repo = newDepartmentController();
  return repo.updateDepartment(id, data, token);
}

export async function deleteDepartmentAction(
  id: string,
  token: string
): Promise<APIResponse<DeleteDepartmentResponse | null>> {
  const repo = newDepartmentController();
  return repo.deleteDepartment(id, token);
}

export async function getDepartmentsAction(
  data: GetDepartmentsRequest,
  token: string
): Promise<APIResponse<GetDepartmentsResponse | null>> {
  const repo = newDepartmentController();
  return repo.getDepartments(data, token);
}

export async function assignDepartmentAction(
  data: AssignmentDepartmentRequest,
  token: string
): Promise<APIResponse<AssignmentDepartmentResponse | null>> {
  const repo = newDepartmentController();
  return repo.assignDepartment(data, token);
}
