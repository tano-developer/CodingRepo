import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'; // Import product routes
import userRoutes from './routes/userRoutes.js'; // Import user routes


dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

const PORT = process.env.PORT || 5000;

// Routes
// Make sure this line is included and correct:
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); // Users-related routes
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinar

// Database connection function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`App is connected to the database.`);
    } catch (error) {
        console.error(`Error connecting to DB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};


// Cloudinary configuration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start server function
const startServer = async () => {
    try {
        await connectDB(); // Connect to the database before starting the server
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

startServer(); // Call the function to start the server
