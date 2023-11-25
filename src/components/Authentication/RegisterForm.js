import {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../Layout/Header";
import classes from "./RegisterForm.module.css";
import LoginContext from "../../store/login-context";



const isEmpty = (value) => value.trim() === '';
const isLengthValid = (value) => value.length >= 6;
const hasNumber = (value) => /\d/.test(value);

const hasUppercase = (value) => /[A-Z]/.test(value);

const hasSpecialChar = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);

const isEmail = (value) => value.includes("@") && value.endsWith(".com");
const RegisterForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef();
    const navigate = useNavigate();
    const loginCtx = useContext(LoginContext);

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        surname: true,
        email: true,
        password: true,
        repeatPassword: true,
    });

    // const clearInputFields = () => {
    //     nameInputRef.current.value = '';
    //     surnameInputRef.current.value = '';
    //     emailInputRef.current.value = '';
    //     passwordInputRef.current.value = '';
    // };

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
            repeatPassword: enteredRepeatPasswordIsValid
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredSurnameIsValid &&
            enteredEmailIsValid &&
            enteredPasswordIsValid && enteredRepeatPasswordIsValid;

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
        navigate("/");
        loginCtx.register();
    };

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const surnameControlClasses = `${classes.control} ${
        formInputsValidity.surname ? '' : classes.invalid
    }`;
    const emailControlClasses = `${classes.control} ${
        formInputsValidity.email ? '' : classes.invalid
    }`;
    const passwordControlClasses = `${classes.control} ${
        formInputsValidity.password ? '' : classes.invalid
    }`;
    const repeatPasswordControlClasses = `${classes.control} ${
        formInputsValidity.repeatPassword ? '' : classes.invalid
    }`;

    return (
        <div className={classes.form}>
            {/*<Header />*/}
            <h1 className={classes.title}>Registration</h1>
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
                </div>
                <div className={passwordControlClasses}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={passwordInputRef} style={{"fontSize": "0.6rem"}} />
                    {!formInputsValidity.password && <p>Please enter a valid password! (password must be at least 6 characters long, contain at least
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
            <div>Already have an account?<Link to={"/login"} style={{"margin": "0rem 0.2rem"}}>Click here to log in</Link></div>
            <div><Link to={"/"} style={{"margin": "0rem 0.2rem"}}>Back to homepage</Link></div>
        </div>
    );

}

export default RegisterForm;