import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database");
    } catch (err) {
        console.log("Database connection error:", err);
        throw err;
    }
}

export default connectDB;
