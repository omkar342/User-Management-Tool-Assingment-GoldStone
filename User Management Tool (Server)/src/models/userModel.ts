import mongoose, { Schema, Document } from "mongoose";

type User = Document & {
  name: string;
  email: string;
  gender: string;
  status: string;
};

const userSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("Users", userSchema);

export default UserModel;
