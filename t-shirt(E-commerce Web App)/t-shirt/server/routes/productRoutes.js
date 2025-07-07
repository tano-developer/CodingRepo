import express from "express";
import multer from "multer";
import {
    addProduct,
    filterProducts,
    getBestSellers,
    getByCategory,
    getProduct,
    getProducts,
    getTopRated,
    listOfProducts,
    searchProducts,
} from "../controllers/productControllers.js";
import cloudinary from 'cloudinary';

// Configure multer for image upload
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

const router = express.Router();

// Route to get all products
router.get('/', getProducts);

// Route to get a single product by id
router.get('/:id', getProduct);

// Route to add a product with image upload
router.post("/product", upload.single('image'), addProduct);

// Route to send products based on men, women, and kids
router.get('/category/:category', getByCategory);

// Route to get top rated products
router.get('/filter/topRated', getTopRated);

// Route to get best sellers
router.get('/filter/bestSellers', getBestSellers);

// Route to search for an item
router.get('/products/search', searchProducts);

// Route to filter products
router.get('/products/filterBy', filterProducts);

// Route to get list of products
router.get('/products/:list', listOfProducts);

export default router;
