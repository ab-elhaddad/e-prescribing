export  default interface PrescriptionPersistanceDto {
  doctorId: string;
  patientId: string;
  drugs: string[];
  updatedAt: Date;
  createdAt: Date;
}
