import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./components/Pages/HomePage";
import AboutPage from "./components/Pages/AboutPage";
import ErrorPage from "./components/Pages/ErrorPage";
import AddNewProductPage from "./components/Pages/AddNewProductPage";
import EditPage from "./components/Pages/EditPage";
import RegisterPage from "./components/Pages/RegisterPage";
import LoginPage from "./components/Pages/LoginPage";
import LoginProvider from "./store/LoginProvider";
import ProductProvider from "./store/ProductProvider";
import AssignRoleToUserPage from "./components/Pages/AssignRoleToUserPage";
import AllOrdersPage from "./components/Pages/AllOrdersPage";
import OrderProvider from "./store/OrderProvider";
import CartProvider from "./store/CartProvider";
import ChangePasswordPage from "./components/Pages/ChangePasswordPage";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/add', element: <AddNewProductPage /> },
            { path: 'edit/:productId', element: <EditPage /> },
            { path: '/register', element: <RegisterPage />},
            { path: '/login', element: <LoginPage />},
            { path: '/assign-role', element: <AssignRoleToUserPage />},
            { path: '/orders', element: <AllOrdersPage />},
            { path: '/change-password', element: <ChangePasswordPage />},
        ],
    }
]);

function App() {

    return<CartProvider><OrderProvider><ProductProvider>
        <LoginProvider>
     <RouterProvider router={router} />
    </LoginProvider></ProductProvider></OrderProvider></CartProvider>
}

export default App;
