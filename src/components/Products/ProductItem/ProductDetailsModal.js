import Modal from "../../UI/Modal";
import ProductContext from "../../../store/product-context";
import {useContext} from "react";
import classes from "./ProductItem.module.css";

const ProductDetailsModal = (props) => {

    // const navigate = useNavigate();
    const productCtx = useContext(ProductContext);
    const selectedProduct = productCtx.products.find((product) => product.id === props.id)



    return <Modal>
        <div>
            <h1>Product Details</h1>
            <li className={classes.product}>
                <div>
                    <h3>{selectedProduct.name}</h3>
                    <img src={selectedProduct.image} alt={""} style={{width: "150px"}}/>
                    <div className={classes.description}>{selectedProduct.description}</div>
                    <div className={classes.description}>{selectedProduct.detailedDescription}</div>
                    <div className={classes.price}>${selectedProduct.price}</div>
                </div>
            </li>
        </div>
        <button className={classes.btn} onClick={props.onClose}>Close</button>
    </Modal>;
}

export default ProductDetailsModal;