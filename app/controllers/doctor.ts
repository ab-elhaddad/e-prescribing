"use server";

import { getUserId } from "@/app/data-access/user";
import {
  addDoctorToPatient,
  removeDoctorFromPatient,
  getPatientsByDoctor,
  getPatientByDoctor,
} from "@/app/data-access/patient";
import {
  addPatientToDoctor,
  removePatientFromDoctor,
} from "@/app/data-access/doctor";
import { handleControllerError } from "./utility";
import { getAssistantsByDoctor } from "../data-access/assistant";
import { ControllerReturn } from "./types";
import { GetUserDto } from "../dtos/user/getUserDto";
import { CreateDrugDto } from "../dtos/drug/createDrugDto";

export async function linkPatientAndDoctorController(
  patientEmail: string,
  doctorId: string,
): Promise<ControllerReturn<void>> {
  try {
    const patientId = await getUserId(patientEmail);
    await Promise.all([
      addDoctorToPatient(patientId, doctorId),
      addPatientToDoctor(patientId, doctorId),
    ]);
    
    return {data: void 0};
  } catch (error: any) {
    return handleControllerError(error);
  }
}

export async function unlinkPatientAndDoctorController(
  patientId: string,
  doctorId: string,
): Promise<ControllerReturn<void>> {
  try {
    // console.log(patientId, doctorId);
    await Promise.all([
      removeDoctorFromPatient(patientId, doctorId),
      removePatientFromDoctor(patientId, doctorId),
    ]);
    return {data: void 0};
  } catch (error: any) {
    return handleControllerError(error);
  }
}

export async function getPatientByDoctorController(
  id: string,
): Promise<ControllerReturn<GetUserDto>> {
  try {
    const patient = await getPatientByDoctor(id);
    return { data: patient };
  } catch (error: any) {
    return handleControllerError(error);
  }
}

export async function getPatientsByDoctorController(): Promise<
  ControllerReturn<GetUserDto[]>
> {
  try {
    const patients = await getPatientsByDoctor();
    return { data: patients };
  } catch (error: any) {
    return handleControllerError(error);
  }
}

export async function getAssistantsByDoctorController(): Promise<
  ControllerReturn<GetUserDto[]>
> {
  try {
    const assistants = await getAssistantsByDoctor();
    return { data: assistants };
  } catch (error: any) {
    return handleControllerError(error);
  }
}

export async function createDrug(drug: CreateDrugDto): Promise<any> {
  try {
  } catch (error: any) {
    return handleControllerError(error);
  }
}
