import Products from "../models/productModel.js";
import cloudinary from 'cloudinary';

// Add a product (controller function)
export const addProduct = async (req, res) => {
    try {
        const { brand, title, rating, reviews, sellPrice, mrp, discount, category } = req.body;
        const img = req.file.buffer.toString('base64'); // Convert buffer to base64 if storing in DB

        const newProduct = await Products.create({
            img, brand, title, rating, reviews, sellPrice, mrp, discount, category
        });

        return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error(`Error while adding product: ${error.message}`, error);
        res.status(500).json({ message: 'Error adding product', error });
    }
}


// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(`Error while fetching products: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

// Get single product by id
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(400).json({ message: "Product doesn't exist." });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error while fetching product: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

// Get products by category
export const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Products.find({ category: new RegExp(`^${category}$`, 'i') });
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};






// Get top-rated products
export const getTopRated = async (req, res) => {
    try {
        const topRatedProducts = await Products.find().sort({ rating: -1 }).limit(12);
        return res.status(200).json(topRatedProducts);
    } catch (err) {
        console.error('Error fetching top-rated products:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

// Get best-selling products
export const getBestSellers = async (req, res) => {
    try {
        const bestSellingProducts = await Products.find().sort({ reviews: -1 }).limit(12);
        return res.status(200).json(bestSellingProducts);
    } catch (err) {
        console.error('Error fetching best-selling products:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

// Search products
export const searchProducts = async (req, res) => {
    try {
        let query = req.query.q ? req.query.q.trim() : '';
        if (query.length === 0) {
            return res.status(400).json({ message: "Empty search field" });
        }

        if (query.includes('sneakers')) {
            query = query.replace('sneakers', 'sneaker');
        }

        // Normalize specific keywords
        query = query.replace(/kids|boys|girls/gi, "child");
        query = query.replace(/mens/gi, "men");
        query = query.replace(/womens/gi, "women");
        query = query.replace(/\b(shoe|shoes)\b/gi, ' ').trim();
        query = query.replace(/'/g, ''); // Remove special characters

        const terms = query.split(/\s+/); // Split search terms
        const searchQuery = {
            $or: terms.map(term => ({
                $or: [
                    { title: { $regex: term, $options: "i" } },
                    { brand: { $regex: term, $options: "i" } },
                    { category: { $in: term } }
                ]
            }))
        };

        const results = await Products.find(searchQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error performing search:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Filter products based on criteria
export const filterProducts = async (req, res) => {
    try {
        const { brand, rating, category, price, discount } = req.query;

        // Build a filter object based on provided parameters
        const filter = {};

        if (brand) filter.brand = new RegExp(brand, 'i'); // Case-insensitive brand search

        if (rating) {
            const ratingValue = parseFloat(rating);
            if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
                filter.rating = { $gte: ratingValue }; // Filter by rating
            }
        }

        if (category) {
            filter.category = category === "Unisex" ? "adult" : category.toLowerCase();
        }

        if (price) {
            const priceRangeMatch = price.match(/₹(\d+)-₹(\d+)/);
            if (priceRangeMatch) {
                const minPrice = parseFloat(priceRangeMatch[1].replace(',', ''));
                const maxPrice = parseFloat(priceRangeMatch[2].replace(',', ''));
                filter.sellPrice = { $gte: minPrice, $lte: maxPrice };
            } else if (price === "₹3000+") {
                filter.sellPrice = { $gte: 3000 };
            }
        }

        if (discount) {
            const discountMatch = discount.match(/(\d+)%/);
            if (discountMatch) {
                const discountValue = parseInt(discountMatch[1], 10);
                filter.discount = { $gte: discountValue };
            }
        }

        const result = await Products.find(filter);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No products found matching the criteria.' });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error while filtering products:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

// Get list of products by IDs
export const listOfProducts = async (req, res) => {
    try {
        const { list } = req.params;
        const idArray = list.split(',').map(id => id.trim());

        if (idArray.length === 0) {
            return res.status(200).json({ message: "No product IDs provided" });
        }

        const result = await Products.find({ _id: { $in: idArray } });
        if (result.length === 0) {
            return res.status(200).json({ message: "Products not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error while fetching products:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
