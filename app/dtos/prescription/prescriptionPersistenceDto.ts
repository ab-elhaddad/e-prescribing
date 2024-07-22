import DrugPersistenceDto from "../drug/drugPersistenceDto";
import UserPersistenceDto from "../user/userPersistenceDto";

export  default interface PrescriptionPersistanceDto {
  _id: string;
  doctorId: UserPersistenceDto;
  patientId: UserPersistenceDto;
  drugs: DrugPersistenceDto[];
  updatedAt: Date;
  createdAt: Date;
}
