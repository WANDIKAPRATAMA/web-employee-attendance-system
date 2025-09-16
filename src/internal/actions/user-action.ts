// user-action.ts

import { newUserController } from "../controllers/user-controller";
import {
  ListUsersRequest,
  ListUsersResponse,
  UpdateProfileRequest,
  ProfileResponse,
} from "../validations/user-validation";

export async function listUsersAction(
  data: ListUsersRequest,
  token: string
): Promise<APIResponse<ListUsersResponse | null>> {
  const repo = newUserController();
  return repo.listUsers(data, token);
}

export async function updateProfileAction(
  data: UpdateProfileRequest,
  token: string
): Promise<APIResponse<ProfileResponse | null>> {
  const repo = newUserController();
  return repo.updateProfile(data, token);
}

export async function getProfileAction(
  token: string
): Promise<APIResponse<ProfileResponse | null>> {
  const repo = newUserController();
  return repo.getProfile(token);
}
