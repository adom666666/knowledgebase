import mongoose from "mongoose";

const MONGODB_URI =
  import.meta.env.VITE_MONGODB_URI ||
  "mongodb://localhost:27017/knowledge_base";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
