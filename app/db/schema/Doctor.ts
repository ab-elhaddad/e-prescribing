import mongoose from "mongoose";
import { Users, UserSchema } from ".";

export interface Doctors extends Users {
  patients: mongoose.ObjectId[];
  assistants: mongoose.ObjectId[];
}

const doctorSchema = new mongoose.Schema<Doctors>(
  {
    ...UserSchema,
    patients: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "Patient",
    },
    assistants: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "Assistant",
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
