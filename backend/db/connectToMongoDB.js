import mongoose from "mongoose";

const connectToMongoDB = async () => {
	let connection;
  if (connection) {
    console.log("using chached connection");
    return connection;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    connection = conn.connection;
    console.log("Connected to MongoDB 🍀");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDB;
