import React, {useContext, useEffect, useState} from "react";
import CartProvider from "../../store/CartProvider";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import Products from "../Products/Products";
import DeleteItemModal from "../Products/DeleteItemModal";
import LoginProvider from "../../store/LoginProvider";
import loginContext from "../../store/login-context";
import Footer from "../Layout/Footer";
import CartContext from "../../store/cart-context";
import LoginContext from "../../store/login-context";
// import cart from "../Cart/Cart";
// import { database, ref } from "../../database/firebaseConfig";
// import {onValue} from "firebase/database"

const HomePage = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
    // const [previousData, setPreviousData] = useState(null);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const showDeleteModalHandler = () => {
        setDeleteModalIsShown(true);
    };


    const hideDeleteModalHandler = () => {
        setDeleteModalIsShown(false);
    };

    // const cartCtx = useContext(CartContext);
    // console.log(cartCtx
    // )
    // const loginCtx = useContext(LoginContext);
    //
    //
    // useEffect(() => {
    //     if(loginCtx.loggedInUser.role === "user") {
    //         console.log("fkdfkosa",localStorage.getItem
    //         (`${loginCtx.loggedInUser.email}cart`));
    //     const storedCart = JSON.parse(localStorage.getItem
    //     (`user-${loginCtx.loggedInUser.email}-cart`)) || [];
    //     const storedProductCounter = JSON.parse(localStorage.getItem
    //     (`user-${loginCtx.loggedInUser.email}-productCounter`)) || 0;
    //     const storedTotalAmount = JSON.parse(localStorage.
    //     getItem(`user-${loginCtx.loggedInUser.email}-totalAmount`)) || 0;
    //     // useEffect(() => {
    //     //     // Save the cart in localStorage whenever it changes
    //     //     // const storedCart = localStorage.getItem(`user-${user.email}-cart`);
    //     //     localStorage.setItem(`user-${user.email}-cart`, JSON.stringify(cartCtx.cart));
    //     // }, [cartCtx.cart]);
    //
    //     cartCtx.getCartFromStorage(storedCart);
    //     cartCtx.getProductCounterFromStorage(storedProductCounter);
    //     cartCtx.getTotalAmountFromStorage(storedTotalAmount);
    //     // setTotalAmount(storedTotalAmount);
    //         // cartCtx.handleProductCounter(storedProductCounter);
    //         // cartCtx.
    //     }
    //     else {
    //         // cartCtx.getCartFromStorage([]);
    //         // cartCtx.getProductCounterFromStorage(0);
    //         // cartCtx.getTotalAmountFromStorage(0);
    //     }
    // }, [loginCtx.loggedInUser]);
    //
    // useEffect(() => {
    //     if(loginCtx.loggedInUser.role === "user") {
    //     localStorage.setItem(`${loginCtx.loggedInUser.email}cart`, cartCtx.cart);
    //     console.log("kcdmnsjwdcks", cartCtx.cart)
    //     localStorage.setItem(`user-${loginCtx.loggedInUser.email}-productCounter`, JSON.stringify(cartCtx.productCounter));
    //     localStorage.setItem(`user-${loginCtx.loggedInUser.email}-totalAmount`, JSON.stringify(cartCtx.totalAmount)); }
    //     else {}
    // },  [cartCtx.cart, cartCtx.productCounter, cartCtx.totalAmount,
    //     loginCtx.loggedInUser]);

    // useEffect(() => {
    //     const handleDataChange = (snapshot) => {
    //         // This callback will be called whenever the data changes in the database
    //         // You can update your component's state or trigger a reload here
    //         // window.location.reload(); // Reload the page
    //         const data = snapshot.val();
    //
    //         // Check if data has changed
    //         if (data && JSON.stringify(data) !== JSON.stringify(previousData)) {
    //             // Data has changed, trigger a reload
    //             setPreviousData(data); // Update the previous data
    //             // window.location.reload(); // Reload the page
    //         }
    //     };
    //
    //     // Set up the Firebase Realtime Database listener
    //     // const databaseRef = database.ref("https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products.json");
    //     const databaseRef = ref(database, 'products');
    //     // databaseRef.on('value', handleDataChange);
    //     // onValue(databaseRef, handleDataChange);
    //     const unsubscribe = onValue(databaseRef, handleDataChange);
    //
    //     return () => {
    //         // Remove the listener when the component unmounts
    //         unsubscribe();
    //     };
    // }, [previousData]); // Empty dependency array ensures that this effect runs only once when the component mounts

    return (
        <div>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            {deleteModalIsShown && <DeleteItemModal onClose={hideDeleteModalHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
                <Products onShowDeleteModal={showDeleteModalHandler} />
            </main>
            <Footer/>
        </div>
    );
}

export default HomePage;