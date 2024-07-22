"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { getUser } from "./user";
import getUserDto from "../dtos/user/getUserDto";
import { handleUserId } from "./utility";

export async function getDoctorsByPatient(patientId?: string) {
  patientId = handleUserId(patientId);

  const patient = await getUser(patientId);
  if (patient.role !== "patient") throw { msg: "Unauthorized" };

  const doctorsIds = patient.doctors || [];
  if (doctorsIds.length === 0) return [];

  const doctors = await clerkClient().users.getUserList({ userId: doctorsIds });
  return doctors.data.map((doctor) => getUserDto(doctor));
}

export async function addPatientToDoctor(patientId: string, doctorId: string) {
  const doctor = await clerkClient().users.getUser(doctorId);
  const doctorPatients = (doctor.publicMetadata.doctors || []) as string[];
  return clerkClient().users.updateUser(doctorId, {
    publicMetadata: {
      ...doctor.publicMetadata,
      patients: [...doctorPatients, patientId],
    },
  });
}

export async function removePatientFromDoctor(
  patientId: string,
  doctorId: string
) {
  const doctor = await clerkClient().users.getUser(doctorId);
  const doctorPatients = doctor.publicMetadata.patients as string[];
  return clerkClient().users.updateUser(doctorId, {
    publicMetadata: {
      ...doctor.publicMetadata,
      patients: doctorPatients.filter(
        (doctorPatientId) => doctorPatientId !== patientId
      ),
    },
  });
}
