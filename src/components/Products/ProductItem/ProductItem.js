import React, {useContext, useEffect, useState} from 'react';

import ProductItemForm from './ProductItemForm';
import classes from './ProductItem.module.css';
import CartContext from '../../../store/cart-context';
import { Link, useNavigate } from 'react-router-dom';
import DeleteItemModal from "../DeleteItemModal";
import LoginContext from "../../../store/login-context";

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate(); // Get the history object

  const price = `$${props.price.toFixed(2)}`;
  const [isProductEdited, setIsProductEdited ] = useState(false);
  const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);

    const [reloadComponent, setReloadComponent] = useState(false);

    useEffect(() => {
        if (isProductEdited) {
            // Reload the component by toggling reloadComponent state
            setReloadComponent((prev) => !prev);
        }
    }, [isProductEdited]);

    const showDeleteModalHandler = () => {
        setDeleteModalIsShown(true);
    };

    const hideDeleteModalHandler = () => {
        setDeleteModalIsShown(false);
    };

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image
    });
  };

    const editItemHandler = async () => {
        // Navigate to the "/add" page and forward the product as a prop
        navigate("/edit/" + props.id);
        const url = "https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products/" + props.id + ".json"
        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            const responseData = await response.json();
            const product = {id: responseData.key, name: responseData.name,
            description: responseData.description, price: responseData.price, image: responseData.image};
            if (product.name !== props.name || product.description !==props.description || product.price !==props.price || product.image !==props.image) {
                setIsProductEdited(true);
            }
            console.log(isProductEdited)

        } catch (error) {
            // Handle the error, e.g., show an error message
            console.error('Error finding item', error);
        }

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
        {deleteModalIsShown && <DeleteItemModal id={props.id} onClose={hideDeleteModalHandler} />}
      <div>
        <Link to={"/" + props.id}>
        <h3>{props.name}</h3>
        </Link>
        <img src={props.image} alt={""} style={{width: "300px"}}/>
        <div className={classes.description}>{props.description}</div>
          <div className={classes.description} style={{"color": "darkslateblue", "fontWeight": "bold"}}>Category: {props.category}</div>
        <div className={classes.price}>{price}</div>
      </div>
        { loginCtx.isLoggedIn === true && loginCtx.loggedInUser.role === "admin" && <div style={{margin: "2.1rem"}}>
            <button onClick={editItemHandler} style={{margin: "0.1rem "}} className={classes.btn}>Edit</button>
            <button onClick={setDeleteModalIsShown} className={classes.btn}>Delete</button>
        </div>}
      <div>
          { loginCtx.isLoggedIn === true && loginCtx.loggedInUser.role === "user" &&
              <ProductItemForm onAddToCart={addToCartHandler} />}
      </div>
    </li>
  );
};

export default ProductItem;
