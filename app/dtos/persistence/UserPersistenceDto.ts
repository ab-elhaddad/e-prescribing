import { User } from "@clerk/nextjs/server";

type UserPersistenceDto  = {
  publicMetadata: {
    dob: string;
    age: number;
    address: string;
    gender: string;
    updatedAt: Date;
    createdAt: Date;
  };
} & User & (Patient | Assistant | Doctor);

export default UserPersistenceDto;

type Doctor = {
  publicMetadata: {
    role: "doctor";
    patients: string[];
    assistants: string[];
    pendingPrescriptions: string[];
  };
};

type Assistant = {
  publicMetadata: {
    role: "assistant";
    doctors: string[];
    pendingPrescriptions: string[];
  };
};

type Patient = {
  publicMetadata: {
    role: "patient";
    doctors: string[];
    prescriptions: string[];
  };
};
