import getDrugDto, { GetDrugDto } from "../drug/getDrugDto";
import PendingPrescriptionsPersistenceDto from "./pendingPrescriptionPersistenceDto";

export type GetPendingPrescriptionDto = {
  id: string;
  patientId: string;
  doctorId: string;
  drugs: GetDrugDto[];
};

export default function getPendingPrescriptionDto(
  pendingPrescription: PendingPrescriptionsPersistenceDto,
): GetPendingPrescriptionDto {
  return {
    id: pendingPrescription._id,
    patientId: pendingPrescription.patientId,
    doctorId: pendingPrescription.doctorId,
    drugs: pendingPrescription.drugs.map((drug) => getDrugDto(drug)),
  };
}
