import { setDefaultResultOrder } from "dns";
import mongoose from "mongoose";

// fixing according to the node version [v22.16.0]
setDefaultResultOrder("ipv4first");

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
    });

    console.log(`MongoDB is connected [${conn.connection.host}]`);

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected!");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected!");
    });
  } catch (error) {
    console.error("MongoDB connection failed...");
    console.log(error);
    process.exit(1);
  }
};
