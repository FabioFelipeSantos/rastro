import type { User, UserResponseLogin } from "../../types/user";
import type { ApiBaseResponse } from "./apiBaseResponse";

export interface UserResponse extends ApiBaseResponse {
  data: User | null;
}

export interface UserListResponse extends ApiBaseResponse {
  data: User[] | null;
}

export interface UserLoginServerResponse extends ApiBaseResponse {
  data: UserResponseLogin | null;
}
