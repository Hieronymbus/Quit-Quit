import mongoose from "mongoose";

export const connectToDB = async () => {
    const mongoURI = process.env.NODE_ENV === "production" 
    ? process.env.MONGO_URI_PROD  
    : process.env.MONGO_URI_DEV

    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`Mongo DB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}