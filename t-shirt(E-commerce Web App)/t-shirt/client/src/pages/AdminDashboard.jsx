import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [product, setProduct] = useState({
        img: '',
        brand: '',
        title: '',
        rating: 0,
        reviews: 0,
        sellPrice: 0,
        mrp: 0,
        discount: 0,
        category: 'Men',
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { brand, title, sellPrice } = product;
        if (!imageFile || !brand || !title || sellPrice <= 0) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('brand', brand);
        formData.append('title', title);
        formData.append('rating', product.rating);
        formData.append('reviews', product.reviews);
        formData.append('sellPrice', product.sellPrice);
        formData.append('mrp', product.mrp);
        formData.append('discount', product.discount);
        formData.append('category', product.category);

        try {
            setUploadingImage(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/products/product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message || 'Product added successfully');
            setProduct({
                img: '',
                brand: '',
                title: '',
                rating: 0,
                reviews: 0,
                sellPrice: 0,
                mrp: 0,
                discount: 0,
                category: 'Men',
            });
            setImageFile(null);
        } catch (err) {
            console.error('Error adding product:', err.message);
            alert('Error adding product');
        } finally {
            setUploadingImage(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-5 mb-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Admin Dashboard - Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Image Upload:</span>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Brand:</span>
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Title:</span>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Rating:</span>
                    <input
                        type="number"
                        name="rating"
                        value={product.rating}
                        min="0"
                        max="5"
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Reviews:</span>
                    <input
                        type="number"
                        name="reviews"
                        value={product.reviews}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Selling Price:</span>
                    <input
                        type="number"
                        name="sellPrice"
                        value={product.sellPrice}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">MRP:</span>
                    <input
                        type="number"
                        name="mrp"
                        value={product.mrp}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Discount:</span>
                    <input
                        type="number"
                        name="discount"
                        value={product.discount}
                        min="0"
                        max="100"
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Category:</span>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </label>

                <button
                    type="submit"
                    disabled={uploadingImage}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {uploadingImage ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AdminDashboard;
