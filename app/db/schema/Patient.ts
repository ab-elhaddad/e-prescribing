import mongoose from "mongoose";
import { Users, UserSchema } from ".";

export interface Patients extends Users {
  prescriptions: mongoose.ObjectId[];
  doctors: mongoose.ObjectId[];
}

const patientSchema = new mongoose.Schema<Patients>(
  {
    ...UserSchema,
    prescriptions: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "Prescription",
    },
    doctors: { type: [mongoose.Types.ObjectId], default: [], ref: "Doctor" },
  },
  { timestamps: true }
);

export const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);
