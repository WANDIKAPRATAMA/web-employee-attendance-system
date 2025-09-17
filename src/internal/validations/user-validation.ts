// user-validation.ts

import { z } from "zod";
import { DepartmentResponse } from "./department-validation";

export const ListUsersRequestSchema = z.object({
  email: z.email().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  department_id: z.string().optional(), // UUID as string
  created_at_start: z.string().optional(), // Format: YYYY-MM-DD
  created_at_end: z.string().optional(), // Format: YYYY-MM-DD
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export type ListUsersRequest = z.infer<typeof ListUsersRequestSchema>;

export type Pagination = {
  current_page: number;
  total_items: number;
  total_pages: number;
  has_next_page: boolean;
  next_page: number | null;
};

export type UserResponse = {
  id: string;
  source_user_id: string;
  employee_code: string;
  department_id?: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  address: string;
  created_at: string;
  updated_at: string;
  department?: Record<string, any>;
  application_role?: Record<string, any>;
};

export type ListUsersResponse = {
  users: UserResponse[];
  pagination: Pagination;
};

export const UpdateProfileRequestSchema = z.object({
  full_name: z.string().min(2).max(255).optional(),
  phone: z
    .string()
    .regex(/^\+?\d{8,15}$/)
    .optional(),
  avatar_url: z.string().url().optional(),
  address: z.string().max(500).optional(),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;

export type ProfileResponse = {
  id: string;
  source_user_id: string;
  employee_code: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  address: string;
  department_id?: string;
  department?: DepartmentResponse;
};
