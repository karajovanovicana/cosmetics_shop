import React, {useContext, useEffect, useState} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import LoginContext from "../../store/login-context";
import OrderContext from "../../store/order-context";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const loginCtx = useContext(LoginContext);
    const user = loginCtx.loggedInUser;
    const orderCtx = useContext(OrderContext);
    useEffect(() => {
        cartCtx.isInCartHandler(true);
    }, [cartCtx.isInCart])

    // useEffect(() => {
    //     if(loginCtx.loggedInUser.role === "user") {
    //         const storedCart = JSON.parse(localStorage.getItem
    //         (`${loginCtx.loggedInUser.email}cart`));
    //         const storedProductCounter = JSON.parse(localStorage.getItem
    //         (`user-${loginCtx.loggedInUser.email}-productCounter`));
    //         const storedTotalAmount = JSON.parse(localStorage.
    //         getItem(`user-${loginCtx.loggedInUser.email}-totalAmount`));
    //
    //        console.log("sc",storedCart);
    //        console.log("sc11",storedCart);
    //        cartCtx.getCartFromStorage(storedCart);
    //        cartCtx.getProductCounterFromStorage(storedProductCounter);
    //        cartCtx.getTotalAmountFromStorage(storedTotalAmount);
    //
    //         localStorage.setItem(`${loginCtx.loggedInUser.email}cart`, JSON.stringify(cartCtx.cart));
    //         console.log("kcdmnsjwdcks", JSON.stringify(cartCtx.cart));
    //         console.log("AAkcdmnsjwdcks", JSON.parse(JSON.stringify(cartCtx.cart)));
    //         localStorage.setItem(`user-${loginCtx.loggedInUser.email}-productCounter`, JSON.stringify(cartCtx.productCounter));
    //         localStorage.setItem(`user-${loginCtx.loggedInUser.email}-totalAmount`, JSON.stringify(cartCtx.totalAmount));
    //     }
    //     else {
    //         cartCtx.getCartFromStorage([]);
    //         cartCtx.getProductCounterFromStorage(0);
    //         cartCtx.getTotalAmountFromStorage(0);
    //     }
    // }, [loginCtx.loggedInUser]);

    // useEffect(() => {
    //     if(loginCtx.loggedInUser.role === "user") {
    //         localStorage.setItem(`${loginCtx.loggedInUser.email}cart`, JSON.stringify(cartCtx.cart));
    //         console.log("kcdmnsjwdcks", JSON.stringify(cartCtx.cart));
    //         console.log("AAkcdmnsjwdcks", JSON.parse(JSON.stringify(cartCtx.cart)));
    //         localStorage.setItem(`user-${loginCtx.loggedInUser.email}-productCounter`, JSON.stringify(cartCtx.productCounter));
    //         localStorage.setItem(`user-${loginCtx.loggedInUser.email}-totalAmount`, JSON.stringify(cartCtx.totalAmount));
    //     }
    // },  [loginCtx.loggedInUser]);

    let totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    if (totalAmount.toString() === "$-0.00") {
        totalAmount = "$0.00";
    }
    const hasItems = cartCtx.cart.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItemFromCartHandler(id);
        // console.log(totalAmount.trim().toString())
    };

    const cartItemAddHandler = (item) => {
        cartCtx.isInCartHandler(true);
        cartCtx.addItemToCartHandler(item);
        cartCtx.handleProductCounter(1);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        orderCtx.orderAddedHandler();

        const currentDate = new Date();
        await fetch('https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.cart,
                date: currentDate.toString()
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        localStorage.setItem(`${loginCtx.loggedInUser.email}cart`, JSON.stringify([]));
        localStorage.setItem(`user-${loginCtx.loggedInUser.email}-productCounter`, JSON.stringify(0));
        localStorage.setItem(`user-${loginCtx.loggedInUser.email}-totalAmount`, JSON.stringify(0));
        cartCtx.clearCartHandler();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.cart.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout totalAmount={totalAmount} onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;