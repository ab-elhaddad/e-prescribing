import mongoose from "mongoose";

export interface Prescriptions extends mongoose.Document {
  doctorEmail: mongoose.ObjectId;
  patientEmail: mongoose.ObjectId;
  drugs: mongoose.ObjectId[];
  updatedAt: Date;
  createdAt: Date;
}

const prescriptionSchema = new mongoose.Schema<Prescriptions>(
  {
    doctorEmail: { type: mongoose.Types.ObjectId, required: true },
    patientEmail: { type: mongoose.Types.ObjectId, required: true },
    drugs: { type: [mongoose.Types.ObjectId], required: true },
  },
  {
    timestamps: true,
  }
);

export const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", prescriptionSchema);
