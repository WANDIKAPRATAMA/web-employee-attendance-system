// auth-controller.ts

import { ZodError } from "zod";
import {
  SignupRequestSchema,
  SignupRequest,
  SignupResponse,
  SigninRequestSchema,
  SigninRequest,
  SigninResponse,
  ChangePasswordRequestSchema,
  ChangePasswordRequest,
  ChangePasswordResponse,
  RefreshTokenRequestSchema,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ChangeRoleRequestSchema,
  ChangeRoleRequest,
  ChangeRoleResponse,
  SignoutResponse,
} from "../validations/auth-validation";
import { AuthInterface } from "../interface/auth-interface";
import {
  signUpRest,
  signInRest,
  changePasswordRest,
  refreshTokenRest,
  changeRoleRest,
  signOutRest,
} from "../services/auth-service";
import { handleZodError } from "../utils/fetch";

export class RestAuthController implements AuthInterface {
  async signUp(
    data: SignupRequest
  ): Promise<APIResponse<SignupResponse | null>> {
    const parsed = SignupRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<SignupResponse>(parsed.error);
    }

    return signUpRest(parsed);
  }

  async signIn(
    data: SigninRequest,
    deviceId: string
  ): Promise<APIResponse<SigninResponse | null>> {
    const parsed = SigninRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<SigninResponse>(parsed.error);
    }

    return signInRest(parsed, deviceId);
  }

  async changePassword(
    data: ChangePasswordRequest,
    token: string
  ): Promise<APIResponse<ChangePasswordResponse | null>> {
    const parsed = ChangePasswordRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<ChangePasswordResponse>(parsed.error);
    }

    return changePasswordRest(parsed, token);
  }

  async refreshToken(
    data: RefreshTokenRequest,
    deviceId: string
  ): Promise<APIResponse<RefreshTokenResponse | null>> {
    const parsed = RefreshTokenRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<RefreshTokenResponse>(parsed.error);
    }

    return refreshTokenRest(parsed, deviceId);
  }

  async changeRole(
    data: ChangeRoleRequest,
    token: string
  ): Promise<APIResponse<ChangeRoleResponse | null>> {
    const parsed = ChangeRoleRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<ChangeRoleResponse>(parsed.error);
    }

    return changeRoleRest(parsed, token);
  }

  async signOut(token: string): Promise<APIResponse<SignoutResponse | null>> {
    return signOutRest(token);
  }
}

export function newAuthController(): AuthInterface {
  //   if (process.env.MODE === "supabase") return new SupabaseAuthController();
  return new RestAuthController();
}
