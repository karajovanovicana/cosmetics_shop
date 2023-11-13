import classes from "./LoginForm.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";


const isEmpty = (value) => value.trim() === '';
const LoginForm = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        email: true,
        password: true,
    });

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const clearInputFields = () => {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
    };

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const enteredEmailIsValid = !isEmpty(enteredEmail);
        const enteredPasswordIsValid = !isEmpty(enteredPassword);

        setFormInputsValidity({
            email: enteredEmailIsValid,
            password: enteredPasswordIsValid,
        });

        const formIsValid =
            enteredEmailIsValid &&
            enteredPasswordIsValid;

        if (!formIsValid) {
            return;
        }

        props.login({
            email: enteredEmail,
            password: enteredPassword,
        });
        // clearInputFields();
        navigate("/");

    }

    const emailControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const passwordControlClasses = `${classes.control} ${
        formInputsValidity.description ? '' : classes.invalid
    }`;


    return (
        <div className={classes.form}>
            {/*<Header />*/}
            <h1 className={classes.title}>Login</h1>
            <form onSubmit={confirmHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' ref={emailInputRef}  />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input style={{"fontSize": "0.6rem"}} type='password' id='password' ref={passwordInputRef}/>
                </div>
                <div className={classes.actions}>
                    <button className={classes.submit}>Log in</button>
                </div>
            </form>
            <div>Don't have an account?<Link to={"/register"} style={{"margin": "0rem 0.2rem"}}>Click here to register</Link></div>
            <div><Link to={"/"} style={{"margin": "0rem 0.2rem"}}>Back to homepage</Link></div>
        </div>
    );
}

export default LoginForm;