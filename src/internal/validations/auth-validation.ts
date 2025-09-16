// auth-validation.ts

import { z } from "zod";

export const SignupRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  full_name: z.string().min(1),
});

export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export type SignupResponse = {
  id: string;
  email: string;
};

export const SigninRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type SigninRequest = z.infer<typeof SigninRequestSchema>;

export type User = {
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

export type SigninResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export const ChangePasswordRequestSchema = z.object({
  old_password: z.string().min(1),
  new_password: z.string().min(8),
});

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;
export type ChangePasswordResponse = null;

export const RefreshTokenRequestSchema = z.object({
  refresh_token: z.string().min(1),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export const ChangeRoleRequestSchema = z.object({
  role: z.enum(["employee", "admin"]),
});

export type ChangeRoleRequest = z.infer<typeof ChangeRoleRequestSchema>;
export type ChangeRoleResponse = null;

export type SignoutResponse = null;
