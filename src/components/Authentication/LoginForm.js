import classes from "./LoginForm.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import LoginContext from "../../store/login-context";


const isEmpty = (value) => value.trim() === '';
const isEmail = (value) => value.includes("@") && value.endsWith(".com");
const LoginForm = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        email: true,
        password: true,
        userExists: true
    });

    const loginCtx = useContext(LoginContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();
    const doesNotExist = () => loginCtx.isLoggedIn === false;

    const clearInputFields = () => {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
    };

    // let userExists = true;

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const emailExists = loginCtx.users.some(user => user.email === enteredEmail);
        const passwordExists = loginCtx.users.some(user => user.password === enteredPassword);

        const enteredEmailIsValid = !isEmpty(enteredEmail) && isEmail(enteredEmail);
        const enteredPasswordIsValid = !isEmpty(enteredPassword);
        const enteredEmailAndPasswordExist = enteredEmailIsValid && emailExists && enteredPasswordIsValid && passwordExists;

        setFormInputsValidity({
            email: enteredEmailIsValid,
            password: enteredPasswordIsValid,
            userExists: enteredEmailAndPasswordExist
        });

        const formIsValid =
            enteredEmailIsValid &&
            enteredPasswordIsValid && enteredEmailAndPasswordExist;

        if (!formIsValid) {
            return;
        }

        props.login({
            email: enteredEmail,
            password: enteredPassword,
        });
        // clearInputFields();
        // if(!doesNotExist()) {
            navigate("/");
        // } else {

        // }

    }

    const emailControlClasses = `${classes.control} ${
        (formInputsValidity.email && formInputsValidity.userExists) ? '' : classes.invalid
    }`;
    const passwordControlClasses = `${classes.control} ${
        (formInputsValidity.password && formInputsValidity.userExists) ? '' : classes.invalid
    }`;


    return (
        <div className={classes.form}>
            {/*<Header />*/}
            <h1 className={classes.title}>Login</h1>
            <form onSubmit={confirmHandler}>
                <div className={emailControlClasses}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' ref={emailInputRef}  />
                    {!formInputsValidity.email && <p>Please enter a valid email!</p>}
                </div>
                <div className={passwordControlClasses}>
                    <label htmlFor='password'>Password</label>
                    <input style={{"fontSize": "0.6rem"}} type='password' id='password' ref={passwordInputRef}/>
                    {!formInputsValidity.password && <p>Please enter a valid password!</p>}
                    {formInputsValidity.password && formInputsValidity.email && !formInputsValidity.userExists && <p>That combination of email and password doesn't seem to exist.</p>}
                    {/*{!loginCtx.isLoggedIn && <p>Password or email is incorrect!!</p>}*/}
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