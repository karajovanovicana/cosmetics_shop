import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import Header from "../Layout/Header";
import classes from "./AddNewProduct.module.css";
import ProductContext from "../../store/product-context";

const isEmpty = (value) => value.trim() === '';
const isNotANumber = (value) => isNaN(value) && isNaN(parseFloat(value));
const isNotImage = (value) => !value.endsWith(".jpg") && !value.endsWith(".png");
const EditProduct = (props) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const navigate = useNavigate();
    const [isProductEdited, setIsProductEdited] = useState(false);


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
    const categoryInputRef = useRef();

    const clearInputFields = () => {
        nameInputRef.current.value = '';
        imageInputRef.current.value = '';
        descriptionInputRef.current.value = '';
        priceInputRef.current.value = '';
    };

    const productCtx = useContext(ProductContext);
    const allProducts = productCtx.products;
    // setProducts(allProducts);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const response = await fetch(
    //             'https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products.json'
    //         );
    //
    //         if (!response.ok) {
    //             throw new Error('Something went wrong!');
    //         }
    //
    //         const responseData = await response.json();
    //
    //         const loadedProducts = [];
    //
    //         for (const key in responseData) {
    //             loadedProducts.push({
    //                 id: key,
    //                 name: responseData[key].name,
    //                 description: responseData[key].description,
    //                 price: responseData[key].price,
    //                 image: responseData[key].image
    //             });
    //         }
    //
    //         setProducts(loadedProducts);
    //         setIsLoading(false);
    //     };
    //
    //     fetchProducts().catch((error) => {
    //         setIsLoading(false);
    //         setHttpError(error.message);
    //     });
    // }, []);

    // Find the product with the matching id

    const cancelHandler = () => {
        navigate("/");
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredPrice = priceInputRef.current.value;
        const selectedCategory = categoryInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredImageIsValid = !isEmpty(enteredImage) && !isNotImage(enteredImage);
        const enteredDescriptionIsValid = !isEmpty(enteredDescription);
        const enteredPriceIsValid = !isEmpty(enteredPrice) && !isNotANumber(enteredPrice);

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

        const selectedProduct = allProducts.find((product) => product.id === props.productId);

        if (enteredName !== selectedProduct.name || enteredDescription !== selectedProduct.description || enteredImage !== selectedProduct.image
        || enteredPrice !== selectedProduct.price || selectedCategory !== selectedProduct.category) {
            setIsProductEdited(true);
        }

        props.onConfirm({
            name: enteredName,
            description: enteredDescription,
            image: enteredImage,
            price: parseFloat(enteredPrice),
            category: selectedCategory,
            isProductEdited: isProductEdited
        });
        navigate("/");
        // setTimeout(function () {
        //     window.location.reload();
        // }, 120);
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
    const selectedProduct = allProducts.find((product) => product.id === props.productId);
    const [inputValue, setInputValue] = useState({
        name: selectedProduct ? selectedProduct.name : '',
        description: selectedProduct ? selectedProduct.description : '',
        image: selectedProduct ? selectedProduct.image : '',
        price: selectedProduct ? selectedProduct.price : '',
        category: selectedProduct ? selectedProduct.category : '',
    });

    // Effect to update input values when selectedProduct changes
    useEffect(() => {
        if (selectedProduct) {
            setInputValue({
                name: selectedProduct.name,
                description: selectedProduct.description,
                image: selectedProduct.image,
                price: selectedProduct.price,
                category: selectedProduct.category,
            });
        }
    }, [selectedProduct]);

    // Handle changes in the input fields
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

    // ...

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


    // return (
    //     <div>
    //         <Header />
    //         <h1 className={classes.title}>
    //             Edit Product
    //         </h1>
    //         <main>
    //             <form className={classes.form} onSubmit={confirmHandler}>
    //                 <div className={nameControlClasses}>
    //                     <label htmlFor='name'>Product Name</label>
    //                     <input type='text' id='name' ref={nameInputRef} value={selectedProduct ? selectedProduct.name : ''}/>
    //                     {/*{!formInputsValidity.name && <p>Please enter a valid name!</p>}*/}
    //                 </div>
    //                 <div className={descriptionControlClasses}>
    //                     <label htmlFor='description'>Description</label>
    //                     <input type='text' id='description' ref={descriptionInputRef} value={selectedProduct ? selectedProduct.description : ''}/>
    //                     {!formInputsValidity.description && <p>Please enter a valid street!</p>}
    //                 </div>
    //                 <div className={imageControlClasses}>
    //                     <label htmlFor='image'>Image</label>
    //                     <input type='text' id='image' ref={imageInputRef} value={selectedProduct ? selectedProduct.image : ''} />
    //                     {!formInputsValidity.image && (
    //                         <p>Please enter a valid image (5 characters long)!</p>
    //                     )}
    //                 </div>
    //                 <div className={priceControlClasses}>
    //                     <label htmlFor='price'>Price</label>
    //                     <input type='text' id='price' ref={priceInputRef} value={selectedProduct ? selectedProduct.price : ''} />
    //                     {!formInputsValidity.price && <p>Please enter a valid price!</p>}
    //                 </div>
    //                 <div className={classes.actions}>
    //                     <button className={classes.submit}>Confirm</button>
    //                     {/*<button type='button' onClick={props.onCancel}>*/}
    //                     {/*    Cancel*/}
    //                     {/*</button>*/}
    //                 </div>
    //             </form>
    //         </main>
    //     </div>
    // );
}

export default EditProduct;