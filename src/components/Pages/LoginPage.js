import LoginForm from "../Authentication/LoginForm";
import {useContext, useEffect} from "react";
import LoginContext from "../../store/login-context";
import LoginProvider from "../../store/LoginProvider";
import CartContext from "../../store/cart-context";

function LoginPage() {

    const loginCtx = useContext(LoginContext);
    const cartCtx = useContext(CartContext);

    const loginHandler = async (userData) => {

        const storedCart = JSON.parse(localStorage.getItem
        (`${userData.email}cart`));
        const storedProductCounter = JSON.parse(localStorage.getItem
        (`user-${userData.email}-productCounter`));
        const storedTotalAmount = JSON.parse(localStorage.
        getItem(`user-${userData.email}-totalAmount`));

        if (storedCart === undefined || storedCart === null) {
            cartCtx.getCartFromStorage([]);
            cartCtx.getProductCounterFromStorage(0);
            cartCtx.getTotalAmountFromStorage(0);
        }
        else
        {
            cartCtx.getCartFromStorage(storedCart);
            cartCtx.getProductCounterFromStorage(storedProductCounter);
            cartCtx.getTotalAmountFromStorage(storedTotalAmount);
        }

        loginCtx.login(userData.email, userData.password);

       };

    return <LoginForm login={loginHandler}></LoginForm>;
}

export default LoginPage;