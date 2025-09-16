// user-interface.ts

import {
  ListUsersRequest,
  ListUsersResponse,
  UpdateProfileRequest,
  ProfileResponse,
} from "../validations/user-validation";

export interface UserInterface {
  listUsers: (
    data: ListUsersRequest,
    token: string
  ) => Promise<APIResponse<ListUsersResponse | null>>;
  updateProfile: (
    data: UpdateProfileRequest,
    token: string
  ) => Promise<APIResponse<ProfileResponse | null>>;
  getProfile: (token: string) => Promise<APIResponse<ProfileResponse | null>>;
}
