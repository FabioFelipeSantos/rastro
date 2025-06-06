import type { UserBioAvatar } from "../../types/user";
import { type ApiBaseResponse } from "./apiBaseResponse";

export interface UserBioResponse extends ApiBaseResponse {
  data: UserBioAvatar[] | null;
}
