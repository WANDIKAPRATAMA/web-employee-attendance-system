// auth-interface.ts

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

export interface AuthInterface {
  signUp: (data: SignupRequest) => Promise<APIResponse<SignupResponse | null>>;
  signIn: (
    data: SigninRequest,
    deviceId: string
  ) => Promise<APIResponse<SigninResponse | null>>;
  changePassword: (
    data: ChangePasswordRequest,
    token: string
  ) => Promise<APIResponse<ChangePasswordResponse | null>>;
  refreshToken: (
    data: RefreshTokenRequest,
    deviceId: string
  ) => Promise<APIResponse<RefreshTokenResponse | null>>;
  changeRole: (
    data: ChangeRoleRequest,
    token: string
  ) => Promise<APIResponse<ChangeRoleResponse | null>>;
  signOut: (token: string) => Promise<APIResponse<SignoutResponse | null>>;
}
