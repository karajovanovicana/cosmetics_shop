import React, { useState, useEffect } from 'react';
import classes from './Slideshow.module.css';

const Slideshow = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div>
        <div className={classes.slideshowContainer}>
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`${classes.slide} ${index === currentSlide ? classes.active : ''}`}
                >
                    <img src={src} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </div>
            <button className={classes.prev} onClick={prevSlide}>&#10094;</button>
            <button className={classes.next} onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

export default Slideshow;
