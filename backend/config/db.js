const mongoose = require("mongoose");

const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/crudapp";
const configuredUri = process.env.MONGO_URI?.trim();
const defaultUri = configuredUri || LOCAL_MONGO_URI;

const connectDB = async () => {
  const connectTo = async (uri) => {
    await mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully to", uri);
  };

  try {
    await connectTo(defaultUri);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    if (defaultUri !== LOCAL_MONGO_URI) {
      console.log("Attempting fallback to local MongoDB at", LOCAL_MONGO_URI);
      try {
        await connectTo(LOCAL_MONGO_URI);
      } catch (fallbackError) {
        console.error("Local MongoDB fallback failed:", fallbackError.message);
        console.error(
          "Please ensure MongoDB is running locally or set MONGO_URI to a reachable database.",
        );
      }
    } else {
      console.error(
        "Please ensure MongoDB is running locally at mongodb://127.0.0.1:27017/crudapp.",
      );
    }
  }
};

module.exports = connectDB;
