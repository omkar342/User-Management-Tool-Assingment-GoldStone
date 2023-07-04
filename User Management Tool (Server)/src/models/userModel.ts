import mongoose, { Schema, Document } from "mongoose";

type User = Document & {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

const userSchema: Schema<User> = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<User>("Users", userSchema);

export default User;
