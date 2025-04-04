export type TUser = {
  id: String;
  password: String;
  needsPassword: Boolean;
  role: "admin" | "student" | "faculty";
  isDeleted: boolean;
  status: "in-progress" | "bloked";
};

export type NewUser = {
  password?: string;
  role: string;
  id: string;
};
