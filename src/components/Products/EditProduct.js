import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import Header from "../Layout/Header";
import classes from "./Form.module.css";
import ProductContext from "../../store/product-context";

const isEmpty = (value) => value.trim() === '';
const isNotANumber = (value) => isNaN(value) && isNaN(parseFloat(value));
const isNotImage = (value) => !value.endsWith(".jpg") && !value.endsWith(".png");
const EditProduct = (props) => {
    const navigate = useNavigate();
    const productCtx = useContext(ProductContext);
    const allProducts = productCtx.products;


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
        const enteredDescriptionIsValid = !isEmpty(enteredDescription);
        const enteredDetailedDescriptionIsValid = !isEmpty(enteredDetailedDescription);
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
            enteredPriceIsValid && enteredDetailedDescriptionIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            description: enteredDescription,
            detailedDescription: enteredDetailedDescription,
            image: enteredImage,
            price: parseFloat(enteredPrice),
            category: selectedCategory,
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

    const selectedProduct = allProducts.find((product) => product.id === props.productId);
    const [inputValue, setInputValue] = useState({
        name: selectedProduct ? selectedProduct.name : '',
        description: selectedProduct ? selectedProduct.description : '',
        detailedDescription: selectedProduct ? selectedProduct.detailedDescription : '',
        image: selectedProduct ? selectedProduct.image : '',
        price: selectedProduct ? selectedProduct.price : '',
        category: selectedProduct ? selectedProduct.category : '',
    });

    useEffect(() => {
        const selectedProduct = allProducts.find((product) => product.id === props.productId);
        if (selectedProduct) {
            setInputValue({
                name: selectedProduct.name,
                description: selectedProduct.description,
                detailedDescription: selectedProduct.detailedDescription,
                image: selectedProduct.image,
                price: selectedProduct.price,
                category: selectedProduct.category,
            });
        }
    }, [selectedProduct]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSelectChange = (event) => {
        const { value } = event.target;
        setInputValue({
            ...inputValue,
            category: value,
        });
    };

    return (
        <div>
            <Header />
            <h1 className={classes.title}>Edit Product</h1>
            <main>
                <form className={classes.form} onSubmit={confirmHandler} >
                    <div className={nameControlClasses}>
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            ref={nameInputRef}
                            value={inputValue.name}
                            onChange={handleInputChange}
                        />
                        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
                    </div>
                    <div className={descriptionControlClasses}>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            ref={descriptionInputRef}
                            value={inputValue.description}
                            onChange={handleInputChange}
                        />
                        {!formInputsValidity.description && <p>Please enter a valid description!</p>}
                    </div>
                    <div className={detailedDescriptionControlClasses}>
                        <label htmlFor="detailedDescription">Detailed Description</label>
                        <input
                            type="text"
                            id="detailedDscription"
                            name="detailedDescription"
                            ref={detailedDescriptionInputRef}
                            value={inputValue.detailedDescription}
                            onChange={handleInputChange}
                        />
                        {!formInputsValidity.detailedDescription && <p>Please enter a valid detailed description!</p>}
                    </div>
                    <div className={imageControlClasses}>
                        <label htmlFor="image">Image</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            ref={imageInputRef}
                            value={inputValue.image}
                            onChange={handleInputChange}
                        />
                        {!formInputsValidity.image && (
                            <p>Please enter a valid image (must be .jpg or .png)!</p>
                        )}
                    </div>
                    <div className={priceControlClasses}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            ref={priceInputRef}
                            value={inputValue.price}
                            onChange={handleInputChange}
                        />
                        {!formInputsValidity.price && <p>Please enter a valid price!</p>}
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="category_dropdown">Category:</label>
                        <select id="category_dropdown" ref={categoryInputRef} value={inputValue.category}
                                onChange={handleSelectChange}>
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

export default EditProduct;