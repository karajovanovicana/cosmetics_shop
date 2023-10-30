import {useRef, useState} from "react";
import classes from "./AddNewProduct.module.css";
import Header from "../Layout/Header";
import {useNavigate} from "react-router-dom";

const isEmpty = (value) => value.trim() === '';
// const isFiveChars = (value) => value.trim().length === 5;
const AddNewProduct = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        description: true,
        image: true,
        name: true,
        price: true,
    });

    const nameInputRef = useRef();
    const imageInputRef = useRef();
    const descriptionInputRef = useRef();
    const priceInputRef = useRef();
    const navigate = useNavigate();

    const clearInputFields = () => {
        nameInputRef.current.value = '';
        imageInputRef.current.value = '';
        descriptionInputRef.current.value = '';
        priceInputRef.current.value = '';
    };

    const cancelHandler = () => {
        navigate("/");
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredPrice = priceInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredImageIsValid = !isEmpty(enteredImage);
        const enteredDescriptionIsValid = !isEmpty(enteredDescription);
        const enteredPriceIsValid = !isEmpty(enteredPrice);

        setFormInputsValidity({
            name: enteredNameIsValid,
            description: enteredDescriptionIsValid,
            image: enteredImageIsValid,
            price: enteredPriceIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredDescriptionIsValid &&
            enteredImageIsValid &&
            enteredPriceIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            description: enteredDescription,
            image: enteredImage,
            price: parseFloat(enteredPrice),
        });

        clearInputFields();
    };

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const descriptionControlClasses = `${classes.control} ${
        formInputsValidity.description ? '' : classes.invalid
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
                {!formInputsValidity.description && <p>Please enter a valid street!</p>}
            </div>
            <div className={imageControlClasses}>
                <label htmlFor='image'>Image</label>
                <input type='text' id='image' ref={imageInputRef} />
                {!formInputsValidity.image && (
                    <p>Please enter a valid image (5 characters long)!</p>
                )}
            </div>
            <div className={priceControlClasses}>
                <label htmlFor='price'>Price</label>
                <input type='text' id='price' ref={priceInputRef} />
                {!formInputsValidity.price && <p>Please enter a valid price!</p>}
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