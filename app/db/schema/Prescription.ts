import PrescriptionPersistanceDto from "@/app/dtos/prescription/prescriptionPersistenceDto";
import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema<PrescriptionPersistanceDto>(
  {
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    drugs: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", prescriptionSchema);
