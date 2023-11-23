import React, {createContext} from 'react';

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