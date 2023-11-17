import React from 'react';

import classes from './ProductsSummary.module.css';
import cosmeticsImage from '../../assets/cosmetics.jpg';
import skinCareImage from '../../assets/skincare.jpg';
import Slideshow from "../UI/Slideshow";

const ProductsSummary = () => {
    const slideshowImages = [cosmeticsImage, skinCareImage]; // Add more images as needed

    return (
        <section className={classes.summary}>
            <Slideshow images={slideshowImages} />
        </section>
    );
};

export default ProductsSummary;
