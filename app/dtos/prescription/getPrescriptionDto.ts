import DrugPersistenceDto from "../drug/drugPersistenceDto";
import PrescriptionPersistanceDto from "./prescriptionPersistenceDto";
import UserPersistenceDto from "../user/userPersistenceDto";
import getDrugDto, { GetDrugDto } from "../drug/getDrugDto";
import getUserDto, { GetUserDto } from "../user/getUserDto";

export type GetPrescriptionDto = {
  id: string;
  patient: GetUserDto;
  doctor: GetUserDto;
  drugs: GetDrugDto[];
};

export default function getPrescriptionDto(prescription: PrescriptionPersistanceDto): GetPrescriptionDto {
  return {
    id: prescription._id,
    patient: getUserDto(prescription.patientId),
    doctor: getUserDto(prescription.doctorId),
    drugs: prescription.drugs.map(getDrugDto),
  };
}