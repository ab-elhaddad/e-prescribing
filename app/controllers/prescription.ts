import {
  deletePrescription,
  getDoctorPrescriptions,
  getPrescription,
} from "../data-access/prescription";
import { getCurrentUserId } from "../data-access/user";
import getPrescriptionDto, {
  GetPrescriptionDto,
} from "../dtos/data-access/getPrescriptionDto";
import { ControllerReturn } from "./types";
import { handleControllerError } from "./utility";
import { getPatientPrescriptions } from "@/app/data-access/prescription";

export async function deletePrescriptionController(
  id: string,
): Promise<ControllerReturn<void>> {
  try {
    await deletePrescription(id);
    return { data: undefined };
  } catch (error) {
    return handleControllerError(error);
  }
}

export async function getPrescriptionController(
  id: string,
): Promise<ControllerReturn<GetPrescriptionDto>> {
  try {
    const prescription = await getPrescription(id);
    return { data: getPrescriptionDto(prescription) };
  } catch (error) {
    return handleControllerError(error);
  }
}

export async function getPatientPrescriptionsController(): Promise<
  ControllerReturn<GetPrescriptionDto[]>
> {
  try {
    const id = getCurrentUserId();
    const prescriptions = await getPatientPrescriptions(id);
    return { data: prescriptions.map(getPrescriptionDto) };
  } catch (error) {
    return handleControllerError(error);
  }
}

export async function getDoctorPrescriptionsController(): Promise<
  ControllerReturn<GetPrescriptionDto[]>
> {
  try {
    const id = getCurrentUserId();
    const prescriptions = await getDoctorPrescriptions(id);
    return { data: prescriptions.map(getPrescriptionDto) };
  } catch (error) {
    return handleControllerError(error);
  }
}
