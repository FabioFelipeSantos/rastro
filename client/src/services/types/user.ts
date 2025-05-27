import type { User, UserResponseLogin } from "../../types/user";
import type { ApiBaseResponse } from "./apiBaseResponse";

export interface UserResponse extends ApiBaseResponse {
  data: User;
}

export interface UserListResponse extends ApiBaseResponse {
  data: User[];
}

export interface UserLoginServerResponse extends ApiBaseResponse {
  data: UserResponseLogin;
}
