import mongoose from "mongoose";
import { Users, UserSchema } from ".";

export interface Assistants extends Users {
  doctors: mongoose.ObjectId[];
}

const assistantSchema = new mongoose.Schema<Assistants>(
  {
    ...UserSchema,
    doctors: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

export const Assistant =
  mongoose.models.Assistant || mongoose.model("Assistant", assistantSchema);
