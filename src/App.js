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
import AuthenticationPage from "./components/Pages/AuthenticationPage";
import RegisterPage from "./components/Pages/RegisterPage";
import LoginPage from "./components/Pages/LoginPage";
import LoginProvider from "./store/LoginProvider";
import ProductProvider from "./store/ProductProvider";
import AssignRoleToUser from "./components/Authentication/AssignRoleToUser";
import AssignRoleToUserPage from "./components/Pages/AssignRoleToUserPage";
import AllOrdersPage from "./components/Pages/AllOrdersPage";
import OrderProvider from "./store/OrderProvider";


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
            { path: 'edit/:productId', element: <EditPage /> },
            { path: '/auth', element: <AuthenticationPage /> },
            { path: '/register', element: <RegisterPage />},
            { path: '/login', element: <LoginPage />},
            { path: '/assign-role', element: <AssignRoleToUserPage />},
            { path: '/orders', element: <AllOrdersPage />},
        ],
    }
]);

function App() {

    return<OrderProvider><ProductProvider> <LoginProvider>
     <RouterProvider router={router} />;
    </LoginProvider></ProductProvider></OrderProvider>
}

export default App;
