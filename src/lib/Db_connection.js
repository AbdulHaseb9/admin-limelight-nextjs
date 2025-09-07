// /app/Libs/Db_Connection.js
import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      console.error("❌ MongoDB URI not found in environment variables");
      return;
    }

    // Agar pehle se connected hai to dobara connect na kare
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
  }
};
