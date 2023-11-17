import {useContext, useEffect, useRef, useState} from 'react';

import classes from './Checkout.module.css';
import LoginContext from "../../store/login-context";

const isEmpty = (value) => value.trim() === '';
// const isFiveChars = (value) => value.trim().length === 5;
const isNotANumber = (value) => isNaN(value) && isNaN(parseFloat(value));

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        email: true,
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const loginCtx = useContext(LoginContext);

    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();


        const enteredEmail = emailInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredEmailIsValid = !isEmpty(enteredEmail);
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && !isNotANumber(enteredPostalCode);

        setFormInputsValidity({
            email: enteredEmailIsValid,
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid =
            enteredEmailIsValid &&
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            email: enteredEmail,
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
            totalAmount: props.totalAmount
        });
    };

    const emailControlClasses = `${classes.control} ${
        formInputsValidity.email ? '' : classes.invalid
    }`;
    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? '' : classes.invalid
    }`;
    const postalCodeControlClasses = `${classes.control} ${
        formInputsValidity.postalCode ? '' : classes.invalid
    }`;
    const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? '' : classes.invalid
    }`;

    const user = loginCtx.loggedInUser;
    const [inputValue, setInputValue] = useState({
        email: user ? user.email : '',
        name: user ? user.name : '',
    });

    // Effect to update input values when selectedProduct changes
    useEffect(() => {
        if (user) {
            setInputValue({
                email: user.email,
                name: user.name,
            });
        }
    }, [user]);

    // Handle changes in the input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={emailControlClasses}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' ref={emailInputRef} value={inputValue.email} onChange={handleInputChange}/>
                {!formInputsValidity.email && <p>Please enter a valid email!</p>}
            </div>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameInputRef} value={inputValue.name} onChange={handleInputChange} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Address</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid address!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && (
                    <p>Please enter a valid postal code!</p>
                )}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;