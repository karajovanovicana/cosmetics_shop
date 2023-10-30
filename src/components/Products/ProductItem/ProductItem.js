import { useContext } from 'react';

import ProductItemForm from './ProductItemForm';
import classes from './ProductItem.module.css';
import CartContext from '../../../store/cart-context';
import { Link, useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate(); // Get the history object

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image
    });
  };

    const editItemHandler = () => {
        // Navigate to the "/add" page and forward the product as a prop
        navigate("/edit/" + props.id);
    };



    const deleteItemHandler = async () => {

        const url = "https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products/" + props.id + ".json"

        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the item.');
            }
            window.location.reload();


        } catch (error) {
            // Handle the error, e.g., show an error message
            console.error('Error deleting item:', error);
        }

    };

  return (
    <li className={classes.product}>
      <div>
        <Link to={"/" + props.id}>
        <h3>{props.name}</h3>
        </Link>
        <img src={props.image} alt={""} style={{width: "300px"}}/>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
        <div style={{margin: "2.1rem"}}>
            <button onClick={editItemHandler} style={{margin: "0.1rem "}} className={classes.btn}>Edit</button>
            <button onClick={deleteItemHandler} className={classes.btn}>Delete</button>
        </div>
      <div>
         <ProductItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default ProductItem;
