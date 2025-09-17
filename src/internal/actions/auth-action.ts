import { newAuthController } from "../controllers/auth-controller";
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

export async function signUpAction(
  data: SignupRequest
): Promise<APIResponse<SignupResponse | null>> {
  const repo = newAuthController();
  return repo.signUp(data);
}

export async function signInAction(
  data: SigninRequest,
  deviceId: string
): Promise<APIResponse<SigninResponse | null>> {
  const repo = newAuthController();
  return repo.signIn(data, deviceId);
}

export async function changePasswordAction(
  data: ChangePasswordRequest,
  token: string
): Promise<APIResponse<ChangePasswordResponse | null>> {
  const repo = newAuthController();
  return repo.changePassword(data, token);
}
export async function changeRoleAction(
  data: ChangeRoleRequest,
  token: string
): Promise<APIResponse<ChangeRoleResponse | null>> {
  const repo = newAuthController();
  return repo.changeRole(data, token);
}
export async function refreshTokenAction(
  data: RefreshTokenRequest,
  deviceId: string
): Promise<APIResponse<RefreshTokenResponse | null>> {
  const repo = newAuthController();
  return repo.refreshToken(data, deviceId);
}

export async function signOutAction(
  token: string
): Promise<APIResponse<SignoutResponse | null>> {
  const repo = newAuthController();
  return repo.signOut(token);
}
