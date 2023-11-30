import {useRef, useState} from "react";
import classes from "./Form.module.css";
import Header from "../Layout/Header";
import {useNavigate} from "react-router-dom";

const isEmpty = (value) => value.trim() === '';
const isNotANumber = (value) => isNaN(value) && isNaN(parseFloat(value));

const isNotImage = (value) => !value.endsWith(".jpg") && !value.endsWith(".png");

const AddNewProduct = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        description: true,
        detailedDescription: true,
        image: true,
        name: true,
        price: true,
    });

    const nameInputRef = useRef();
    const imageInputRef = useRef();
    const descriptionInputRef = useRef();
    const detailedDescriptionInputRef = useRef();
    const priceInputRef = useRef();
    const categoryInputRef = useRef();
    const navigate = useNavigate();


    const cancelHandler = () => {
        navigate("/");
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredDetailedDescription = detailedDescriptionInputRef.current.value;
        const enteredPrice = priceInputRef.current.value;
        const selectedCategory = categoryInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredImageIsValid = !isEmpty(enteredImage) && !isNotImage(enteredImage);
        const enteredDetailedDescriptionIsValid = !isEmpty(enteredDetailedDescription);
        const enteredDescriptionIsValid = !isEmpty(enteredDescription);
        const enteredPriceIsValid = !isEmpty(enteredPrice) && !isNotANumber(enteredPrice);

        setFormInputsValidity({
            name: enteredNameIsValid,
            description: enteredDescriptionIsValid,
            detailedDescription: enteredDetailedDescriptionIsValid,
            image: enteredImageIsValid,
            price: enteredPriceIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredDescriptionIsValid &&
            enteredImageIsValid &&
            enteredPriceIsValid && enteredDetailedDescription;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            description: enteredDescription,
            detailedDescription: enteredDetailedDescription,
            image: enteredImage,
            price: parseFloat(enteredPrice),
            category: selectedCategory
        });

        navigate("/");
    };

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const descriptionControlClasses = `${classes.control} ${
        formInputsValidity.description ? '' : classes.invalid
    }`;
    const detailedDescriptionControlClasses = `${classes.control} ${
        formInputsValidity.detailedDescription ? '' : classes.invalid
    }`;
    const imageControlClasses = `${classes.control} ${
        formInputsValidity.image ? '' : classes.invalid
    }`;
    const priceControlClasses = `${classes.control} ${
        formInputsValidity.price ? '' : classes.invalid
    }`;

    return (
        <div>
        <Header />
            <h1 className={classes.title}>
                Add New Product
            </h1>
        <main>
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Product Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={descriptionControlClasses}>
                <label htmlFor='description'>Description</label>
                <input type='text' id='description' ref={descriptionInputRef} />
                {!formInputsValidity.description && <p>Please enter a valid description!</p>}
            </div>
            <div className={detailedDescriptionControlClasses}>
                <label htmlFor='detailedDescription'>Detailed Description</label>
                <input type='text' id='detailedDescription' ref={detailedDescriptionInputRef} />
                {!formInputsValidity.detailedDescription && <p>Please enter a valid detailed description!</p>}
            </div>
            <div className={imageControlClasses}>
                <label htmlFor='image'>Image</label>
                <input type='text' id='image' ref={imageInputRef} />
                {!formInputsValidity.image && (
                    <p>Please enter a valid image (must be .jpg or .png)!</p>
                )}
            </div>
            <div className={priceControlClasses}>
                <label htmlFor='price'>Price</label>
                <input type='text' id='price' ref={priceInputRef} />
                {!formInputsValidity.price && <p>Please enter a valid price!</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor="category_dropdown">Category:</label>
                <select id="category_dropdown" ref={categoryInputRef}>
                    <option value="makeup">makeup</option>
                    <option value="skincare">skincare</option>
                </select>
            </div>
            <div className={classes.actions}>
                <button className={classes.submit}>Confirm</button>
                <button type='button' onClick={cancelHandler}>
                    Cancel
                </button>
            </div>
        </form>
        </main>
        </div>
    );

}

export default AddNewProduct;