import mongoose from "mongoose";

export interface Drugs extends mongoose.Document {
  doctorEmail: mongoose.ObjectId;
  name: string;
  price: number;
  quantity: number;
  usage: string;
  sideEffects: string[];
  contraindications: string[];
  similarDrugs: string[];
  createdAt: Date;
}

const drugSchema = new mongoose.Schema<Drugs>(
  {
    doctorEmail: { type: mongoose.Types.ObjectId, required: true },
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
