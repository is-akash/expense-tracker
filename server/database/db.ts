import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected!");
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

export default connectDB;
