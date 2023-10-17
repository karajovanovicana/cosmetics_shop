import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import ProductItem from './ProductItem/ProductItem';
import classes from './AvailableProducts.module.css';

const AvailableProducts = () => {
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

  if (isLoading) {
    return (
        <section className={classes.ProductsLoading}>
          <p>Loading...</p>
        </section>
    );
  }

  if (httpError) {
    return (
        <section className={classes.ProductsError}>
          <p>{httpError}</p>
        </section>
    );
  }

  const productsList = products.map((product) => (
      <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
      />
  ));

  return (
      <section className={classes.products}>
        <Card>
          <ul>{productsList}</ul>
        </Card>
      </section>
  );
};

export default AvailableProducts;