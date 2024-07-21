"use server";

import { Prescription } from "../db/schema";
import PrescriptionPersistanceDto from "../dtos/persistence/PrescriptionPersistenceDto";

export async function getPrescription(
  id: string,
): Promise<PrescriptionPersistanceDto> {
  const prescription = await Prescription.findById(id);
  if (!prescription) {
    throw { msg: "Prescription not found" };
  }
  return prescription;
}

export async function getDoctorPrescriptions(id: string) {
  const prescriptions = await Prescription.find({ doctorId: id })
    .populate("patientId")
    .populate("doctorId")
    .populate("drugs");
  return prescriptions;
}

export async function getPatientPrescriptions(
  id: string,
): Promise<PrescriptionPersistanceDto[]> {
  const prescriptions = await Prescription.find({ patientId: id })
    .populate("patientId")
    .populate("doctorId")
    .populate("drugs");
  return prescriptions;
}

export async function deletePrescription(id: string): Promise<void> {
  Prescription.findByIdAndDelete(id);
}
