export type User = {
  id: string;
  first_name: string;
  last_name: string | null;
  nickname: string;
  email: string;
  role: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
};

export type UserResponseLogin = {
  refresh: string;
  access: string;
  user: Pick<User, "id" | "email" | "nickname" | "is_active">;
};
