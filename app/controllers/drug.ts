import { getDrugsByDoctor } from "../data-access/drug";
import getDrugDto, { GetDrugDto } from "../dtos/drug/getDrugDto";
import { ControllerReturn } from "./types";
import { handleControllerError } from "./utility";

export async function getDrugsByDoctorController(): Promise<ControllerReturn<GetDrugDto[]>> {
  try {
    const drugs = await getDrugsByDoctor();
    return { data: drugs.map((drug) => getDrugDto(drug)) };
  } catch (error) {
    return handleControllerError(error);
  }
}
