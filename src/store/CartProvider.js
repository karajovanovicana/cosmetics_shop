import {useState} from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [productCounter, setProductCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);

  const itemAddedHandler = (bool) => {
    setIsItemAdded(bool);
  }

  const getCartFromStorage = (storedCart) => {
    setCart(storedCart);
  }

  const getProductCounterFromStorage = (storedCounter) => {
    setProductCounter(storedCounter);
  }

  const getTotalAmountFromStorage = (storedAmount) => {
    setTotalAmount(storedAmount);
  }


  const addItemToCartHandler = (item) => {
    const existingCartItemIndex= cart.findIndex(
        (cartItem) => cartItem.id === item.id
    );
    const existingCartItem = cart[existingCartItemIndex];

    if (existingCartItem) {
      let updatedItem;
      console.log("is in cart ", isInCart)
      if(isInCart){
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
      }
      else {
        updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
      }
      const updatedItems = [...cart];
      updatedItems[existingCartItemIndex] = updatedItem;
      setCart(updatedItems);
    } else {
      const newCart = [...cart, item];
      setCart(newCart);
    }
    if(isInCart)
      setTotalAmount(totalAmount + item.price);
    else
      setTotalAmount(totalAmount + item.price * item.amount);

  };

  const removeItemFromCartHandler = (id) => {

    const existingCartItemIndex = cart.findIndex(
        (item) => item.id === id
    );
    const existingItem = cart[existingCartItemIndex];

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

  return (
      <CartContext.Provider value={{addItemToCartHandler, removeItemFromCartHandler, clearCartHandler,
        cart, totalAmount, productCounter, handleProductCounter, isInCartHandler, isInCart,
        getCartFromStorage, getProductCounterFromStorage, getTotalAmountFromStorage,
        itemAddedHandler, isItemAdded}}>
        {props.children}
      </CartContext.Provider>
  );
};

export default CartProvider;