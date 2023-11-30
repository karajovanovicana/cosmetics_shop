import AddNewProduct from "../Products/AddNewProduct";
import {useContext} from "react";
import ProductContext from "../../store/product-context";

const AddNewProductPage = () => {
    const productCtx = useContext(ProductContext);
    const addProductHandler = async (productData) => {
        await fetch('https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
            method: 'POST',
            body: JSON.stringify({
                name: productData.name,
                description: productData.description,
                detailedDescription: productData.detailedDescription,
                image: productData.image,
                price: productData.price,
                category: productData.category
            }),
        });
        productCtx.productAddedHandler();

    };

    return <AddNewProduct onConfirm={addProductHandler}/>;
}

export default AddNewProductPage;