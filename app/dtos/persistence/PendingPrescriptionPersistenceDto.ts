export default interface PendingPrescriptionsPersistenceDto {
  doctorId: string;
  patientId: string;
  drugs: string[];
  updatedAt: Date;
  createdAt: Date;
}
