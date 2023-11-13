import React, { useContext, useState } from 'react';

import Card from '../UI/Card';
import ProductItem from './ProductItem/ProductItem';
import classes from './AvailableProducts.module.css';
import ProductContext from "../../store/product-context";

const AvailableProducts = (props) => {
    const productCtx = useContext(ProductContext);
    const allProducts = productCtx.products;

    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();
    const [filterTerm, setFilterTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(filterTerm.toLowerCase()) &&
        (selectedCategory === '' || product.category === selectedCategory)
    );

    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

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

    const productsList = filteredProducts.map((product) => (
        <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            category={product.category}
            onClick={props.onShowDeleteModal}
        />
    ));

    return (
        <section className={classes.products}>
            <Card>
                {/* Filter inputs */}
                <div className={classes.filters}>
                    <input
                        className={classes.input}
                        type="text"
                        placeholder="Search by product name"
                        value={filterTerm}
                        onChange={handleFilterChange}
                    />
                    <select
                        className={classes.select}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">all categories</option>
                        <option value="makeup">makeup</option>
                        <option value="skincare">skincare</option>
                        {/* Add more options based on your actual categories */}
                    </select>
                </div>
                <ul>{productsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableProducts;
