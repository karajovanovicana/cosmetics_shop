
import EditProduct from "../Products/EditProduct";
import {useParams} from "react-router-dom";

const EditPage = () => {
    const params = useParams();
    const editHandler = async (productData) => {
        await fetch(`https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products/${params.productId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: productData.name,
                description: productData.description,
                image: productData.image,
                price: productData.price,
            }),
        });
    };

    return <EditProduct productId={params.productId} onConfirm={editHandler}/>;
}

export default EditPage;