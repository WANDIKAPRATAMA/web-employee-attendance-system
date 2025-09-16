// user-controller.ts

import { UserInterface } from "../interface/user-interface";
import {
  listUsersRest,
  updateProfileRest,
  getProfileRest,
} from "../services/user-service";
import { handleZodError } from "../utils/fetch";
import {
  ListUsersRequest,
  ListUsersResponse,
  ListUsersRequestSchema,
  UpdateProfileRequest,
  ProfileResponse,
  UpdateProfileRequestSchema,
} from "../validations/user-validation";

export class RestUserController implements UserInterface {
  async listUsers(
    data: ListUsersRequest,
    token: string
  ): Promise<APIResponse<ListUsersResponse | null>> {
    const parsed = ListUsersRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<ListUsersResponse>(parsed.error);
    }

    return listUsersRest(parsed, token);
  }

  async updateProfile(
    data: UpdateProfileRequest,
    token: string
  ): Promise<APIResponse<ProfileResponse | null>> {
    const parsed = UpdateProfileRequestSchema.safeParse(data);
    if (!parsed.success) {
      return handleZodError<ProfileResponse>(parsed.error);
    }

    return updateProfileRest(parsed, token);
  }

  async getProfile(
    token: string
  ): Promise<APIResponse<ProfileResponse | null>> {
    return getProfileRest(token);
  }
}

export function newUserController(): UserInterface {
  // if (process.env.MODE === "supabase") return new SupabaseUserController();
  return new RestUserController();
}
