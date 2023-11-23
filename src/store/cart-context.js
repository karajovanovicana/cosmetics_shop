import React, {createContext, useContext} from 'react';
import LoginContext from "./login-context";


const CartContext = createContext({
  addItemToCartHandler: (item) => {},
  removeItemFromCartHandler: (id) => {},
  clearCartHandler: () => {},
  handleProductCounter: () => {},
  cart: [],
  totalAmount: 0,
  productCounter: 0,
  isInCartHandler: () => {},
  isInCart: false,
  getProductCounterFromStorage: (counter) => {},
  getCartFromStorage: (cart) => {},
  getTotalAmountFromStorage: (amount) => {}
});
export default CartContext;