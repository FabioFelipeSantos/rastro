import type { Tweet } from "./tweet";

export type UserCreate = {
  first_name: string;
  last_name: string | null;
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type UserUpdate = Partial<UserCreate>;

export type User = {
  id: string;
  first_name: string;
  last_name: string | null;
  nickname: string;
  email: string;
  role: string;
  is_active: boolean;
  is_admin: boolean;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
};

export type UserAvatar = {
  id: number;
  file_name: string;
  file_saved_name: string;
  file_path: string;
  created_at: string;
  updated_at: string;
};

export type BioCreate = {
  text: string;
};

export type UserBioAvatar = {
  id: number;
  text: string;
  city: string;
  state: string;
  country: string;
  avatar: UserAvatar | { file_path: UserAvatar["file_path"] } | null;
  user: Pick<User, "id" | "first_name" | "last_name" | "nickname" | "avatar_url"> & {
    following_count: number;
    follower_count: number;
  };
  created_at: string;
  updated_at: string;
};

export type UserLogin = {
  nickname_or_email: string;
  password: string;
};

export type UserResponseLogin = {
  refresh: string;
  access: string;
  user: Pick<User, "id" | "email" | "nickname" | "is_active">;
};

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
};

export type UserProfile = {
  user: User;
  bio: UserBioAvatar;
  tweets: Tweet[];
};

export type ProfileUpdateResponse = {
  user?: User;
  bio?: UserBioAvatar;
};

export type ProfileUpdateJson = {
  first_name?: string;
  last_name?: string | null;
  nickname?: string;
  email?: string;
  text?: string;
  password?: string;
  password_confirmation?: string;
};

export type ProfileUpdate = ProfileUpdateJson | FormData;

// Helper para verificar o tipo
export function isFormData(value: ProfileUpdate): value is FormData {
  return value instanceof FormData;
}
