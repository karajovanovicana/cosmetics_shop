import classes from "./OrderItem.module.css";
import DeleteItemModal from "../Products/DeleteItemModal";
import {Link} from "react-router-dom";
import ProductItemForm from "../Products/ProductItem/ProductItemForm";
import React from "react";


const OrderItem = () => {
    return (
        <li className={classes.order}>
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
}

export default OrderItem;