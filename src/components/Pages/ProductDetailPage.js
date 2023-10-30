import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import ProductItem from "../Products/ProductItem/ProductItem";
import HeaderCartButton from "../Layout/HeaderCartButton";
import classes from "../Products/ProductItem/ProductItem.module.css";
import ProductItemForm from "../Products/ProductItem/ProductItemForm";

function ProductDetailPage() {
    const params = useParams();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                'https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products.json'
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
                    image: responseData[key].image
                });
            }

            setProducts(loadedProducts);
            setIsLoading(false);
        };

        fetchProducts().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    // Find the product with the matching id
    const selectedProduct = products.find((product) => product.id === params.productId);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : httpError ? (
                <p>{httpError}</p>
            ) : selectedProduct ? (
                <div>
                    <h1>Product Details</h1>
                    <li className={classes.product}>
                        <div>
                            <h3>{selectedProduct.name}</h3>
                            <img src={selectedProduct.image} alt={""} style={{width: "300px"}}/>
                            <div className={classes.description}>{selectedProduct.description}</div>
                            <div className={classes.price}>{selectedProduct.price}</div>
                        </div>
                    </li>
                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
}

export default ProductDetailPage;
