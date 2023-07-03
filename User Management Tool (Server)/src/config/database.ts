import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDBURI: string = process.env.MONGODB_URI as string;

const connectDB = async (): Promise<void> => {
  // Connect to MongoDB using Mongoose
  mongoose
    .connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
};

export default connectDB;
