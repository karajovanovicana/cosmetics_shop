import EditProduct from "../Products/EditProduct";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import ProductContext from "../../store/product-context";

const EditPage = () => {
    const params = useParams();
    const productCtx = useContext(ProductContext);
    const editHandler = async (productData) => {
        productCtx.productEditedHandler();
        await fetch(`https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products/${params.productId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: productData.name,
                description: productData.description,
                detailedDescription: productData.detailedDescription,
                image: productData.image,
                price: productData.price,
                category: productData.category
            }),
        });
    };

    return <EditProduct productId={params.productId} onConfirm={editHandler}/>;
}

export default EditPage;