import DrugPersistenceDto from "@/app/dtos/persistence/DrugPersistenceDto";
import mongoose from "mongoose";

const drugSchema = new mongoose.Schema<DrugPersistenceDto>(
  {
    doctorId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    usage: { type: String, required: true },
    sideEffects: { type: [String], required: true },
    contraindications: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const Drug = mongoose.models.Drug || mongoose.model("Drug", drugSchema);
