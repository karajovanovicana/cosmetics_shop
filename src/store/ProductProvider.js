import React, { useEffect, useState } from "react";
import ProductContext from "./product-context";

const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [isProductEdited, setIsProductEdited] = useState(false);
    const [isProductDeleted, setIsProductDeleted] = useState(false);
    const [isProductAdded, setIsProductAdded] = useState(false);

    const productDeletedHandler = () => {
        setIsProductDeleted(true);
    }

    const productEditedHandler = () => {
        setIsProductEdited(true);
    }

    const productAddedHandler = () => {
        setIsProductAdded(true);
    }

    useEffect(() => {
        const fetchAllProductsHandler = async () => {
            try {
                const response = await fetch(
                    'https://cosmetics-shop-328c7-default-rtdb' +
                    '.europe-west1.firebasedatabase.app/products.json'
                );

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const responseData = await response.json();

                const loadedProducts = [];

                for (const key in responseData) {
                    loadedProducts.push({
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price,
                        image: responseData[key].image,
                        category: responseData[key].category,
                        detailedDescription: responseData[key].detailedDescription
                    });
                }

                setProducts(loadedProducts);
                console.log(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setIsProductDeleted(false);
            setIsProductEdited(false);
            setIsProductAdded(false);
        };

        fetchAllProductsHandler().then(() => {});
    }, [isProductEdited, isProductDeleted, isProductAdded]);

    return (
        <ProductContext.Provider value={{ products, productDeletedHandler, productEditedHandler, productAddedHandler }}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
