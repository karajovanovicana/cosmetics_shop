import React, { useState} from "react";
import CartProvider from "../../store/CartProvider";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import Products from "../Products/Products";
import DeleteItemModal from "../Products/DeleteItemModal";
import LoginProvider from "../../store/LoginProvider";
import loginContext from "../../store/login-context";
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
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            {deleteModalIsShown && <DeleteItemModal onClose={hideDeleteModalHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
                <Products onShowDeleteModal={showDeleteModalHandler} />
            </main>
        </CartProvider>
    );
}

export default HomePage;