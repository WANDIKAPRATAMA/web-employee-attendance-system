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

export type GetAttendanceLogsResponse = AttendanceLogResponse[];

export const GetAttendanceHistoryRequestSchema = z.object({
  user_id: z.string().uuid(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export type GetAttendanceHistoryRequest = z.infer<
  typeof GetAttendanceHistoryRequestSchema
>;

export type AttendanceHistoryResponse = {
  id: string;
  employee_code: string;
  attendance_id: string;
  date_attendance: string;
  attendance_type: "in" | "out";
  description: string;
  created_at: string;
  updated_at: string;
};

export type GetAttendanceHistoryResponse = AttendanceHistoryResponse[];

export const AdminDashboardRequestSchema = z.object({
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

export type AdminDashboardRequest = z.infer<typeof AdminDashboardRequestSchema>;

export type AdminDashboardResponse = {
  total_employees_per_dept: Record<string, number>;
  total_updated_depts: number;
  total_today_registrations: number;
};

export const CheckCurrentStatusRequestSchema = z.object({
  user_id: z.uuid().optional(),
});

export type CheckCurrentStatusRequest = z.infer<
  typeof CheckCurrentStatusRequestSchema
>;

export type CurrentStatusResponse = {
  user_id: string;
  employee_code: string;
  full_name: string;
  department?: string;
  status: "Clocked In" | "Clocked Out" | "Not Clocked";
  clock_in?: string | null;
  clock_out?: string | null;
  updated_at: string;
};
