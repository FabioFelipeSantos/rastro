import type { UserAvatar, UserBioAvatar } from "../../types/user";
import { type ApiBaseResponse } from "./apiBaseResponse";

export interface UserBioForResponse extends Omit<UserBioAvatar, "avatar"> {
  avatar: UserAvatar | { file_path: UserAvatar["file_path"] } | null;
}

export interface UserBioResponse extends ApiBaseResponse {
  data: UserBioForResponse[] | null;
}
