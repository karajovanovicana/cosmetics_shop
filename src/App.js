// import { useState } from 'react';
//
// import Header from './components/Layout/Header';
// import Products from './components/Products/Products';
// import Cart from './components/Cart/Cart';
// import CartProvider from './store/CartProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./components/Pages/HomePage";
import AboutPage from "./components/Pages/AboutPage";
import ErrorPage from "./components/Pages/ErrorPage";
import ProductDetailPage from "./components/Pages/ProductDetailPage";
import AddNewProduct from "./components/Products/AddNewProduct";
import AddNewProductPage from "./components/Pages/AddNewProductPage";
import EditProduct from "./components/Products/EditProduct";
import EditPage from "./components/Pages/EditPage";


// const router = createBrowserRouter([
//     { path: '/home', element: <HomePage /> },
//     { path: '/about', element: <AboutPage /> },
//     errorElement: <ErrorPage />,
// ]);

const router = createBrowserRouter([
    {
        path: '/',
        //
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/:productId', element: <ProductDetailPage /> },
            { path: '/add', element: <AddNewProductPage /> },
            { path: 'edit/:productId', element: <EditPage /> }
        ],
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
