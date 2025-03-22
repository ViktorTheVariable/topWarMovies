import mongoose from "mongoose";

async function connectDB() {
    try {
        const URL = process.env.MONGO_URL || "";
        await mongoose.connect(URL);
        console.log("Connected to mongoDB");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error while connecting to mongoDB: ${error.message}`);
        }
    }
}

export default connectDB;