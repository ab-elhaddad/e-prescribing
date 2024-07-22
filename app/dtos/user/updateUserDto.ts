export type UpdateUserDto = {
  firstName: string;
  lastName: string;
  address?: string;
  gender: "male" | "female";
  dob?: string;
};
