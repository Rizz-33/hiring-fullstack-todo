import { setDefaultResultOrder } from "dns";
import mongoose from "mongoose";

// fixing according to the node version [v22.16.0]
setDefaultResultOrder("ipv4first");

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 5,
      minPoolSize: 1,
      retryWrites: true,
      retryReads: true,
    });

    console.log(`MongoDB is connected [${conn.connection.host}]`);

    mongoose.connection.on("connecting", () =>
      console.log("connecting to MongoDB...")
    );
    mongoose.connection.on("connected", () =>
      console.log("MongoDB connected!")
    );
    mongoose.connection.on("disconnecting", () =>
      console.log("disconnecting from MongoDB...")
    );
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB disconnected!")
    );
    mongoose.connection.on("reconnected", () =>
      console.log("MongoDB reconnected!")
    );
    mongoose.connection.on("error", (error) =>
      console.error("MongoDB error:", error)
    );
  } catch (error) {
    console.error("MongoDB connection failed...");
    console.error(error);
    process.exit(1);
  }
};
