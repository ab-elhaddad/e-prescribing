import DrugPersistenceDto from "../drug/drugPersistenceDto";

export default interface PendingPrescriptionsPersistenceDto {
  _id: string;
  doctorId: string;
  patientId: string;
  drugs: DrugPersistenceDto[];
  updatedAt: Date;
  createdAt: Date;
}
