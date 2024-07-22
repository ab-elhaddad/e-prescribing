"use server";

import { CreateDrugDto } from "@/app/dtos/drug/createDrugDto";
import { getCurrentUser, getUser } from "./user";
import { Drug } from "@/app/db/schema";
import DrugPersistenceDto from "../dtos/drug/drugPersistenceDto";

export async function getDrug(id: string) {
  return Drug.findById(id);
}

export async function getDrugsByDoctor(): Promise<DrugPersistenceDto[]> {
  const doctor = await getCurrentUser();
  if (doctor.role !== "doctor") throw { msg: "Unauthorized" };

  const drugsIds = doctor.drugs || [];
  const drugs = await Drug.find({ doctorId: { drugsIds } });
  return drugs;
}

export async function createDrug(drug: CreateDrugDto) {
  await Drug.create(drug);
}
