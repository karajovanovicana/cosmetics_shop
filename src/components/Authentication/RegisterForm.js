import React, {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import classes from "../Products/Form.module.css";
import registerClasses from "./Auth.module.css";
import LoginContext from "../../store/login-context";
import loginClasses from "./Auth.module.css";
import Modal from "../UI/Modal";


const isEmpty = (value) => value.trim() === '';
const isLengthValid = (value) => value.length >= 6;
const hasNumber = (value) => /\d/.test(value);

const hasUppercase = (value) => /[A-Z]/.test(value);

const hasSpecialChar = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);

const isEmail = (value)=> /\S+@\S+\.\S+/.test(value);

const doesEmailAlreadyExist = (value, users) => {
    let userAlreadyExists = false;
    for (const user of users) {
        if (user.email === value) {
            userAlreadyExists = true;
            break;
        }
    }
    return userAlreadyExists;
}
const RegisterForm = (props) => {

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef();
    const navigate = useNavigate();
    const loginCtx = useContext(LoginContext);
    const [didRegister, setDidRegister] = useState(false);

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        surname: true,
        email: true,
        password: true,
        repeatPassword: true,
        emailNotInUse: true
    });

    const registerHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredSurname = surnameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredRepeatPassword = repeatPasswordInputRef.current.value;
        let userRole = "user";

        if (enteredName === "admin") {
            userRole = "admin";
        }

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredSurnameIsValid = !isEmpty(enteredSurname);
        const enteredEmailIsValid = !isEmpty(enteredEmail) && isEmail(enteredEmail);
        const enteredEmailNotAlreadyUsed = !doesEmailAlreadyExist(enteredEmail, loginCtx.users);
        const enteredPasswordIsValid = !isEmpty(enteredPassword) && isLengthValid(enteredPassword)
        && hasNumber(enteredPassword)
            && hasUppercase(enteredPassword) && hasSpecialChar(enteredPassword);
        const enteredRepeatPasswordIsValid =
            !isEmpty(enteredRepeatPassword) && (enteredPassword === enteredRepeatPassword);
        setFormInputsValidity({
            name: enteredNameIsValid,
            surname: enteredSurnameIsValid,
            email: enteredEmailIsValid,
            password: enteredPasswordIsValid,
            repeatPassword: enteredRepeatPasswordIsValid,
            emailNotInUse: enteredEmailNotAlreadyUsed
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredSurnameIsValid &&
            enteredEmailIsValid &&
            enteredPasswordIsValid && enteredRepeatPasswordIsValid && enteredEmailNotAlreadyUsed;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            surname: enteredSurname,
            email: enteredEmail,
            password: enteredPassword,
            userRole: userRole,
        });
        setDidRegister(true);
    };

    const onClose = () => {
        setDidRegister(false);
        loginCtx.register();
        navigate("/login");

    }


    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const surnameControlClasses = `${classes.control} ${
        formInputsValidity.surname ? '' : classes.invalid
    }`;
    const emailControlClasses = `${classes.control} ${
        (formInputsValidity.email && formInputsValidity.emailNotInUse) ? '' : classes.invalid
    }`;
    const passwordControlClasses = `${classes.control} ${
        formInputsValidity.password ? '' : classes.invalid
    }`;
    const repeatPasswordControlClasses = `${classes.control} ${
        formInputsValidity.repeatPassword ? '' : classes.invalid
    }`;

    const didRegisterModalContent = (
        <Modal>
            <p>Successfully registered!</p>
            <p>Please log in</p>
            <div className={classes.actions}>
                <button onClick={onClose}>
                    Close
                </button>
            </div>
        </Modal>
    );

    return (
        <div className={registerClasses.form}>
            <h1 className={registerClasses.title}>Registration</h1>
            {didRegister && didRegisterModalContent}
            <form onSubmit={registerHandler}>
                <div className={nameControlClasses}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' ref={nameInputRef} />
                    {!formInputsValidity.name && <p>Please enter a valid name!</p>}
                </div>
                <div className={surnameControlClasses}>
                    <label htmlFor='surname'>Surname</label>
                    <input type='text' id='surname' ref={surnameInputRef} />
                    {!formInputsValidity.surname && <p>Please enter a valid surname!</p>}
                </div>
                <div className={emailControlClasses}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' ref={emailInputRef} />
                    {!formInputsValidity.email && <p>Please enter a valid email!</p>}
                    {!formInputsValidity.emailNotInUse && <p>It seems there is already a user with this email. Try again!</p>}
                </div>
                <div className={passwordControlClasses}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={passwordInputRef}
                           style={{"fontSize": "0.6rem"}} />
                    {!formInputsValidity.password &&
                        <p>Please enter a valid password! (password must be at least 6 characters long,
                            contain at least
                        one number, one special character and one uppercase letter)</p>}
                </div>
                <div className={repeatPasswordControlClasses}>
                    <label htmlFor='repeatPassword'>Repeat Password</label>
                    <input type='password' id='repeatPassword' ref={repeatPasswordInputRef} style={{"fontSize": "0.6rem"}} />
                    {!formInputsValidity.repeatPassword && <p>Passwords don't match!</p>}
                </div>
                <div className={classes.actions}>
                <button className={classes.submit}>Register</button>
                </div>
            </form>
            <div>Don't have an account?
                <Link to={"/login"} style={{"margin": "0rem 0.2rem"}}>
                    <span className={loginClasses.link}> Click here to log in </span></Link>
            </div>
            <div style={{"marginRight": "30rem"}}>
                <Link to={"/"} style={{"margin": "0rem 0.2rem"}}>
                    <span className={loginClasses.link}>Back to homepage</span></Link>
            </div>
        </div>
    );

}

export default RegisterForm;