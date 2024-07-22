"use server";

import { PendingPrescription } from "../db/schema";
import PendingPrescriptionsPersistenceDto from "../dtos/pending-prescription/pendingPrescriptionPersistenceDto";


export async function getPendingPrescription(id: string) {
  return new Promise(() => {}) as Promise<PendingPrescriptionsPersistenceDto>;
}

export async function getPendingPrescriptions() {
  return new Promise(() => []) as Promise<PendingPrescriptionsPersistenceDto[]>;
}

export async function createPendingPrescription() {
  return new Promise(() => {}) as Promise<PendingPrescriptionsPersistenceDto>;
}

export async function deletePendingPrescription(id: string) {
  PendingPrescription.findByIdAndDelete(id);
}