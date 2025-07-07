import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import About from "./components/About.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Cart from "./pages/Cart.jsx";
import WishList from "./pages/WishList.jsx";
import { WishListProvider } from "./context/WishListContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> }, // Fixed the typo here
      { path: '/about-us', element: <About /> },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <WishList /> },
      { path: '/shoes/men', element: <Men /> },
      { path: '/shoes/women', element: <Women /> },
      { path: '/shoes/kids', element: <Kids /> },
      { path: '/product-details/:id', element: <ProductDetails /> },
      { path: '/search/:search', element: <SearchResults /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishListProvider>
      <CartProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
        <ToastContainer />
      </CartProvider>
    </WishListProvider>
  </React.StrictMode>
);
