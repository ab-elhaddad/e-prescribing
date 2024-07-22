import { User } from "@clerk/nextjs/server";
import UserPersistenceDto from "./userPersistenceDto";

export type GetUserDto = {
  id: string;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string;
  hasImage: boolean;
  imageUrl: string;
  address: string;
  gender: string;
  dob: string;
  age: number;
  role: string;
} & (GetDoctorDto | GetPatientDto | GetAssistantDto);

type GetDoctorDto = {
  role: "doctor";
} & Partial<{
  drugs: string[];
  patients: string[];
  assistants: string[];
  prescriptions: string[];
  pendingPrescriptions: string[];
}>;

type GetPatientDto = {} & Partial<{
  role: "patient";
  doctors: string[];
  prescriptions: string[];
}>;

type GetAssistantDto = {
  role: "assistant";
} & Partial<{
  doctors: string[];
  pendingPrescriptions: string[];
}>;

const getUserDto = (user: UserPersistenceDto | User): GetUserDto => {
  return {
    id: user.id,
    fullName: user.fullName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
    phoneNumber: user.phoneNumbers[0]?.phoneNumber,
    hasImage: user.hasImage,
    imageUrl: user.imageUrl,
    address: user.publicMetadata.address as string,
    gender: user.publicMetadata.gender as string,
    dob: user.publicMetadata.dob as string,
    age: calculatAge(user.publicMetadata.dob as string),
    role: user.publicMetadata.role as "doctor" | "patient" | "assistant",
    drugs: user.publicMetadata.drugs as string[],
    patients: user.publicMetadata.patients as string[],
    doctors: user.publicMetadata.doctors as string[],
    assistants: user.publicMetadata.assistants as string[],
    prescriptions: user.publicMetadata.prescriptions as string[],
    pendingPrescriptions: user.publicMetadata.pendingPrescriptions as string[],
  };
};

function calculatAge(dob: string) {
  return new Date().getFullYear() - new Date(dob).getFullYear();
}

export default getUserDto;
