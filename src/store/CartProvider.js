import {useContext, useEffect, useReducer, useState} from 'react';

import CartContext from './cart-context';
import LoginContext from "./login-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// const cartReducer = (state, action) => {
//   if (action.type === 'ADD') {
//     const updatedTotalAmount =
//         state.totalAmount + action.item.price * action.item.amount;
//
//     const existingCartItemIndex = state.items.findIndex(
//         (item) => item.id === action.item.id
//     );
//     const existingCartItem = state.items[existingCartItemIndex];
//     let updatedItems;
//
//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + 1,
//       };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItems = state.items.concat(action.item);
//     }
//
//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }
//   if (action.type === 'REMOVE') {
//     const existingCartItemIndex = state.items.findIndex(
//         (item) => item.id === action.id
//     );
//     const existingItem = state.items[existingCartItemIndex];
//     const updatedTotalAmount = state.totalAmount - existingItem.price;
//     // if (updatedTotalAmount.toString() === '-0.00') {
//     //   updatedTotalAmount = 0.00;
//     // }
//     let updatedItems;
//     if (existingItem.amount === 1) {
//       updatedItems = state.items.filter(item => item.id !== action.id);
//     } else {
//       const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }
//
//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount
//     };
//   }
//
//   if (action.type === 'CLEAR') {
//     return defaultCartState;
//   }
//
//   return defaultCartState;
// };

const CartProvider = (props) => {
  // const [cartState, dispatchCartAction] = useReducer(
  //     cartReducer,
  //     defaultCartState
  // );

  const [cart, setCart] = useState([]);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isProductRemoved, setIsProductRemoved] = useState(false);
  const [productCounter, setProductCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  // const getCartFromStorage = (storedCart) => {
  //   setCart(storedCart);
  // }
  //
  // const getProductCounterFromStorage = (storedCounter) => {
  //   setProductCounter(storedCounter);
  // }
  //
  // const getTotalAmountFromStorage = (storedAmount) => {
  //   setTotalAmount(storedAmount);
  // }


  // const loginCtx = useContext(LoginContext);
  //
  // const user = loginCtx.loggedInUser;
  // useEffect(() => {
  //   const storedCart = JSON.parse(localStorage.getItem(`user-${user.email}-cart`)) || [];
  //   const storedProductCounter = JSON.parse(localStorage.getItem(`user-${user.email}-productCounter`)) || 0;
  //   const storedTotalAmount = JSON.parse(localStorage.getItem(`user-${user.email}-totalAmount`)) || 0;
  //   // useEffect(() => {
  //   //     // Save the cart in localStorage whenever it changes
  //   //     // const storedCart = localStorage.getItem(`user-${user.email}-cart`);
  //   //     localStorage.setItem(`user-${user.email}-cart`, JSON.stringify(cartCtx.cart));
  //   // }, [cartCtx.cart]);
  //   setCart(storedCart);
  //   setProductCounter(storedProductCounter);
  //   setTotalAmount(storedTotalAmount);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(`user-${user.email}-cart`, JSON.stringify(cart));
  //   localStorage.setItem(`user-${user.email}-productCounter`, JSON.stringify(productCounter));
  //   localStorage.setItem(`user-${user.email}-totalAmount`, JSON.stringify(totalAmount));
  // }, [cart, productCounter, totalAmount]);

  const addItemToCartHandler = (item) => {

    // const existingCartItemIndex = state.items.findIndex(
    //     (item) => item.id === action.item.id
    // );
    // const existingCartItem = state.items[existingCartItemIndex];
    // let updatedItems;


    const existingCartItemIndex= cart.findIndex(
        (cartItem) => cartItem.id === item.id
    );
    const existingCartItem = cart[existingCartItemIndex];
    // const updatedItems;


    if (existingCartItem) {
      let updatedItem;
      console.log("is in cart ", isInCart)
      if(isInCart){
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        // setTotalAmount(totalAmount + item.price);
      }
      else {
        updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
        // setTotalAmount(totalAmount + item.price * item.amount);
      }
      const updatedItems = [...cart];
      updatedItems[existingCartItemIndex] = updatedItem;
      // setTotalAmount(totalAmount + item.price);
      setCart(updatedItems);
    } else {
      // setProductCounter(0);
      const newCart = [...cart, item];
      setCart(newCart);
      // setProductCounter(productCounter + item.amount);
      // setTotalAmount(totalAmount + item.price);
    }
    // setProductCounter(productCounter + item.amount);
    if(isInCart)
      setTotalAmount(totalAmount + item.price);
    else
      setTotalAmount(totalAmount + item.price * item.amount);

  };

  const removeItemFromCartHandler = (id) => {

//     // if (updatedTotalAmount.toString() === '-0.00') {
//     //   updatedTotalAmount = 0.00;
//     // }
//     let updatedItems;
//     if (existingItem.amount === 1) {
//       updatedItems = state.items.filter(item => item.id !== action.id);
//     } else {
//       const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }

    const existingCartItemIndex = cart.findIndex(
        (item) => item.id === id
    );
    const existingItem = cart[existingCartItemIndex];
    // setTotalAmount(totalAmount - existingItem.price);

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = cart.filter(item => item.id !== id);
      setProductCounter(productCounter - 1);
      setCart(updatedItems);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...cart];
      updatedItems[existingCartItemIndex] = updatedItem;
      setCart(updatedItems);
      setProductCounter(productCounter - 1);
    }
    setTotalAmount(totalAmount - existingItem.price);


    // const item = cart.find(item => item.id === id);
    // setTotalAmount(totalAmount - item.price);
    // const newCart = cart.filter(item => item.id !== id);
    // setProductCounter(productCounter - 1);
    // setCart(newCart);
  };

  const clearCartHandler = () => {
    setCart([]);
    setTotalAmount(0);
    setProductCounter(0);
  };

  const isInCartHandler = (bool) => {
    setIsInCart(bool);
  }

  const handleProductCounter = (number) => {
    setProductCounter(productCounter + number);
  }

  // const cartContext = {
  //   items: cartState.items,
  //   totalAmount: cartState.totalAmount,
  //   addItem: addItemToCartHandler,
  //   removeItem: removeItemFromCartHandler,
  //   clearCart: clearCartHandler
  // };

  return (
      <CartContext.Provider value={{addItemToCartHandler, removeItemFromCartHandler, clearCartHandler,
        cart, totalAmount, productCounter, handleProductCounter, isInCartHandler, isInCart}}>
        {props.children}
      </CartContext.Provider>
  );
};

export default CartProvider;