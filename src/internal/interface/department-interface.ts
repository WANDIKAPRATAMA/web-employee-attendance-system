// department-interface.ts

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

export interface DepartmentInterface {
  createDepartment: (
    data: CreateDepartmentRequest,
    token: string
  ) => Promise<APIResponse<DepartmentResponse | null>>;
  getDepartment: (
    id: string,
    token: string
  ) => Promise<APIResponse<DepartmentResponse | null>>;
  updateDepartment: (
    id: string,
    data: UpdateDepartmentRequest,
    token: string
  ) => Promise<APIResponse<DepartmentResponse | null>>;
  deleteDepartment: (
    id: string,
    token: string
  ) => Promise<APIResponse<DeleteDepartmentResponse | null>>;
  getDepartments: (
    data: GetDepartmentsRequest,
    token: string
  ) => Promise<APIResponse<GetDepartmentsResponse | null>>;
  assignDepartment: (
    data: AssignmentDepartmentRequest,
    token: string
  ) => Promise<APIResponse<AssignmentDepartmentResponse | null>>;
}
