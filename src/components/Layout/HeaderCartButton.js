import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.productCounter;
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(cartCtx.isItemAdded === true) {
      cartCtx.itemAddedHandler(false);
      setBtnIsHighlighted(true);

      const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    } else {
      return;
    }
  }, [cartCtx.cart]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <ShoppingCartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
