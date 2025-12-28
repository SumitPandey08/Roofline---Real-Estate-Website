import mongoose from "mongoose";
import "@/app/(backend)/models/admin.model";
import "@/app/(backend)/models/adminPerformence.model";
import "@/app/(backend)/models/property.model";
import "@/app/(backend)/models/user.model";

export async function connect() {
    try {
        let mongoUri = process.env.MONGODB_URI;

        // if (!mongoUri) {
        //     console.error("MONGODB_URI is not defined in the environment variables.");
        //     process.exit(1);
        // }

        console.log("Original MongoDB URI:", mongoUri);

        // Clean up the URI
        // 1. Take the first part if it's duplicated
        if (mongoUri.includes('?amongodb')) {
            mongoUri = mongoUri.split('?amongodb')[0];
        }
        // 2. Replace 'amongodb' with 'mongodb'
        mongoUri = mongoUri.replace('amongodb', 'mongodb');
        

        console.log("Attempting to connect to MongoDB with corrected URI:", mongoUri);

        await mongoose.connect(mongoUri);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Mongoose connected to the database");
        });

        connection.on("error", (err) => {
            console.error("Mongoose connection error:", err);
            process.exit(1);
        });

    } catch (error) {
        console.error("Database connection error:", error);
    }
}