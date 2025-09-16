import { ZodError, ZodSafeParseResult } from "zod";
import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ChangeRoleRequest,
  ChangeRoleResponse,
  SignoutResponse,
} from "../validations/auth-validation";
import { apiFetch, handleZodError } from "../utils/fetch";

export async function signUpRest(
  payload: ZodSafeParseResult<SignupRequest>
): Promise<APIResponse<SignupResponse | null>> {
  try {
    return apiFetch<SignupResponse>(
      "/auth/signup",
      "POST",
      undefined,
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<SignupResponse>(error);
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

export async function signInRest(
  payload: ZodSafeParseResult<SigninRequest>,
  deviceId: string
): Promise<APIResponse<SigninResponse | null>> {
  try {
    return apiFetch<SigninResponse>(
      "/auth/signin",
      "POST",
      { "X-Device-ID": deviceId },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<SigninResponse>(error);
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

export async function changePasswordRest(
  payload: ZodSafeParseResult<ChangePasswordRequest>,
  token: string
): Promise<APIResponse<ChangePasswordResponse | null>> {
  try {
    return apiFetch<ChangePasswordResponse>(
      "/auth/change-password",
      "POST",
      { Authorization: `Bearer ${token}` },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ChangePasswordResponse>(error);
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

export async function refreshTokenRest(
  payload: ZodSafeParseResult<RefreshTokenRequest>,
  deviceId: string
): Promise<APIResponse<RefreshTokenResponse | null>> {
  try {
    return apiFetch<RefreshTokenResponse>(
      "/auth/refresh-token",
      "POST",
      { "X-Device-ID": deviceId },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<RefreshTokenResponse>(error);
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

export async function changeRoleRest(
  payload: ZodSafeParseResult<ChangeRoleRequest>,
  token: string
): Promise<APIResponse<ChangeRoleResponse | null>> {
  try {
    return apiFetch<ChangeRoleResponse>(
      "/auth/change-role",
      "POST",
      { Authorization: `Bearer ${token}` },
      payload.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ChangeRoleResponse>(error);
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

export async function signOutRest(
  token: string
): Promise<APIResponse<SignoutResponse | null>> {
  try {
    return apiFetch<SignoutResponse>(
      "/auth/signout",
      "POST",
      { Authorization: `Bearer ${token}` },
      undefined
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<SignoutResponse>(error);
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
