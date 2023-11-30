import Modal from "../UI/Modal";
import classes from "./DeleteItemModal.module.css";
import ProductContext from "../../store/product-context";
import {useContext} from "react";

const DeleteItemModal = (props) => {
    const productCtx = useContext(ProductContext);

    const deleteItemHandler = async () => {

        const url = "https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products/" + props.id + ".json"

        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the item.');
            }


        } catch (error) {
            console.error('Error deleting item:', error);
        }
        productCtx.productDeletedHandler();
    };

    return <Modal>
        <div style={{"fontSize": "1.6rem"}}>Are you sure you want to delete this item?</div>
        <button className={classes.btn} onClick={deleteItemHandler}>Yes, I'm sure</button>
        <button className={classes.btn} onClick={props.onClose}>Cancel</button>
    </Modal>;
}

export default DeleteItemModal;