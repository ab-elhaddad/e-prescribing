import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  dob: Date;
  age: number;
  address: string;
  phone: string;
  gender: string;
  isConfirmed: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export const UserSchema: mongoose.SchemaDefinition<Users> = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  isConfirmed: { type: Boolean, default: false },
};
