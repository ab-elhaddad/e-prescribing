"use server";

import getUserDto from "../dtos/user/getUserDto";
import { clerkClient, auth } from "@clerk/nextjs/server";
import { getUser } from "./user";
import { handleUserId } from "./utility";
import { CreateUserDto } from "../dtos/user/createUserDto";

export async function addDoctorToPatient(patientId: string, doctorId: string) {
  const patient = await clerkClient().users.getUser(patientId);
  const patientDoctors = (patient.publicMetadata.patients || []) as string[];
  return clerkClient().users.updateUser(patientId, {
    publicMetadata: {
      ...patient.publicMetadata,
      doctors: [...patientDoctors, doctorId],
    },
  });
}

export async function removeDoctorFromPatient(
  patientId: string,
  doctorId: string
) {
  const patient = await clerkClient().users.getUser(patientId);
  const patientDoctors = patient.publicMetadata.doctors as string[];
  return clerkClient().users.updateUser(patientId, {
    publicMetadata: {
      ...patient.publicMetadata,
      doctors: patientDoctors.filter(
        (patientDoctorId) => patientDoctorId !== doctorId
      ),
    },
  });
}

export async function createPatient(patientData: CreateUserDto) {
  return clerkClient().users.createUser({
    emailAddress: [patientData.email],
    phoneNumber: [patientData.phoneNumber],
    firstName: patientData.firstName,
    lastName: patientData.lastName,
    publicMetadata: {
      ...patientData,
      role: "patient",
    },
  });
}

export async function getPatientByDoctor(patientId: string) {
  return getUser(patientId);
}


/**
 * Get all patients of the doctor with the given doctorId or the current user.
 */
export async function getPatientsByDoctor(doctorId?: string) {
  doctorId = handleUserId(doctorId);
  const doctor = await getUser(doctorId);
  if (doctor.role !== "doctor") throw { msg: "Unauthorized" };

  const patientsIds = doctor.patients || [];
  if (patientsIds.length === 0) return [];
  
  const patients = await clerkClient().users.getUserList({
    userId: patientsIds,
  });

  return patients.data.map((patient) => getUserDto(patient));
}
