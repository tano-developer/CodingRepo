import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from '../components/Products'; // Assuming Products is a component that displays the products

const Men = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/category/kids`);

                if (isMounted) {
                    setProducts(res.data); // Set the fetched products
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false; // Clean-up to prevent memory leaks
        };
    }, []);

    return (
        <>
            <Products loading={loading} error={error} products={products} />
        </>
    );
};

export default Men;
