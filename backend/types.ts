export type Role = "Teacher" | "Admin";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type Grade =
  | "K"
  | "Grade 1"
  | "Grade 2"
  | "Grade 3"
  | "Grade 4"
  | "Grade 5"
  | "Grade 6"
  | "Grade 7"
  | "Grade 8";

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  grades?: [string];
  currentlyTeachingJM?: boolean;
};

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role">;

export interface SchoolMetadata {
  name: string;
  id: string;
  country: string;
  city: string;
  district: string;
  address: string;
}

export type RegisterTeacherDTO = RegisterUserDTO & {
  school: SchoolMetadata;
};

export type AuthDTO = Token & UserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};
