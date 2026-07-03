const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb+srv://abbu_db_user:222H1A05E6@cluster0.zldw4nx.mongodb.net/?appName=Cluster0";

  try {
    await mongoose.connect(mongoUri, {
      family: 4,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully to", mongoUri);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(
      "Please ensure MongoDB is running and reachable at the configured URI.",
    );
  }
};

module.exports = connectDB;
