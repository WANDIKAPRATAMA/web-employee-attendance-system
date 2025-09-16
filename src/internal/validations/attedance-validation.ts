// attendance-validation.ts

import { z } from "zod";

export const ClockInRequestSchema = z.object({});

export type ClockInRequest = z.infer<typeof ClockInRequestSchema>;

export const ClockOutRequestSchema = z.object({});

export type ClockOutRequest = z.infer<typeof ClockOutRequestSchema>;

export type AttendanceResponse = {
  id: string;
  employee_code: string;
  attendance_id: string;
  clock_in: string | null;
  clock_out: string | null;
  created_at: string;
  updated_at: string;
};

export const GetAttendanceLogsRequestSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  department_id: z.string().uuid().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export type GetAttendanceLogsRequest = z.infer<
  typeof GetAttendanceLogsRequestSchema
>;

export type Pagination = {
  current_page: number;
  total_items: number;
  total_pages: number;
  has_next_page: boolean;
  next_page: number | null;
};

export type AttendanceLogResponse = {
  attendance_id: string;
  employee_code: string;
  full_name: string;
  department_name: string;
  clock_in: string | null;
  clock_out: string | null;
  in_punctuality: string;
  out_punctuality: string;
};

export type GetAttendanceLogsResponse = {
  logs: AttendanceLogResponse[];
  pagination: Pagination;
};
