// department-validation.ts

import { z } from "zod";

export const CreateDepartmentRequestSchema = z.object({
  name: z.string().min(3).max(255),
  max_clock_in_time: z.string(),
  max_clock_out_time: z.string(),
});

export type CreateDepartmentRequest = z.infer<
  typeof CreateDepartmentRequestSchema
>;

export type DepartmentResponse = {
  id: string;
  name: string;
  max_clock_in_time: string;
  max_clock_out_time: string;
  created_at: string;
  updated_at: string;
};

export const UpdateDepartmentRequestSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  max_clock_in_time: z.string().optional(),
  max_clock_out_time: z.string().optional(),
});

export type UpdateDepartmentRequest = z.infer<
  typeof UpdateDepartmentRequestSchema
>;

export const GetDepartmentsRequestSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export type GetDepartmentsRequest = z.infer<typeof GetDepartmentsRequestSchema>;

export type Pagination = {
  current_page: number;
  total_items: number;
  total_pages: number;
  has_next_page: boolean;
  next_page: number | null;
};

export type GetDepartmentsResponse = DepartmentResponse[];

export const AssignmentDepartmentRequestSchema = z.object({
  department_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export type AssignmentDepartmentRequest = z.infer<
  typeof AssignmentDepartmentRequestSchema
>;

export type DeleteDepartmentResponse = null;
export type AssignmentDepartmentResponse = null;
