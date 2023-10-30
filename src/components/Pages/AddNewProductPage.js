import AddNewProduct from "../Products/AddNewProduct";
import {useState} from "react";

const AddNewProductPage = () => {
    const addProductHandler = async (productData) => {
        await fetch('https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
            method: 'POST',
            body: JSON.stringify({
                name: productData.name,
                description: productData.description,
                image: productData.image,
                price: productData.price,
            }),
        });
    };

    return <AddNewProduct onConfirm={addProductHandler}/>;
}

export default AddNewProductPage;