import mongoose from "mongoose";

export interface PendingPrescriptions extends mongoose.Document {
  doctorEmail: mongoose.ObjectId;
  patientEmail: mongoose.ObjectId;
  drugs: mongoose.ObjectId[];
  updatedAt: Date;
  createdAt: Date;
}

const pendingPrescriptionSchema = new mongoose.Schema<PendingPrescriptions>(
  {
    doctorEmail: { type: mongoose.Types.ObjectId, required: true },
    patientEmail: { type: mongoose.Types.ObjectId, required: true },
    drugs: { type: [mongoose.Types.ObjectId], required: true },
  },
  {
    timestamps: true,
  }
);

export const PendingPrescription =
  mongoose.models.PendingPrescription ||
  mongoose.model("PendingPrescription", pendingPrescriptionSchema);
