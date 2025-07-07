import { protect } from '../middleware/authMiddleware.js';
import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile 
} from '../controllers/userControllers.js'; // Import user controllers

const router = express.Router();

// Route for user registration (signup)
router.post('/signup', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get user profile (protected route)
router.get('/profile', protect, getUserProfile); // Add authentication middleware to protect

// Route to update user profile (protected route)
router.put('/profile', protect, updateUserProfile); // Add authentication middleware to protect

export default router; // Export the router
