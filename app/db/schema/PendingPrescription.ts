import PendingPrescriptionsPersistenceDto from "@/app/dtos/persistence/PendingPrescriptionPersistenceDto";
import mongoose from "mongoose";

const pendingPrescriptionSchema =
  new mongoose.Schema<PendingPrescriptionsPersistenceDto>(
    {
      doctorId: { type: String, required: true },
      patientId: { type: String, required: true },
      drugs: { type: [String], required: true },
    },
    {
      timestamps: true,
    }
  );

export const PendingPrescription =
  mongoose.models.PendingPrescription ||
  mongoose.model("PendingPrescription", pendingPrescriptionSchema);
