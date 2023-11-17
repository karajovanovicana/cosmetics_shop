import React, { useContext, useState } from 'react';
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
    const orderCtx = useContext(OrderContext);
    cartCtx.isInCartHandler(true);

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