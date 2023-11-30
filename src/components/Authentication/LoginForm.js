import classes from "../Products/Form.module.css";
import loginClasses from "./Auth.module.css";
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
            navigate("/");
    }

    const emailControlClasses = `${classes.control} ${
        (formInputsValidity.email && formInputsValidity.userExists) ? '' : classes.invalid
    }`;
    const passwordControlClasses = `${classes.control} ${
        (formInputsValidity.password && formInputsValidity.userExists) ? '' : classes.invalid
    }`;


    return (
        <div className={loginClasses.form}>
            <h1 className={loginClasses.title}>Login</h1>
            <form onSubmit={confirmHandler}>
                <div className={emailControlClasses}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' ref={emailInputRef}  />
                    {!formInputsValidity.email && <p>Please enter a valid email!</p>}
                </div>
                <div className={passwordControlClasses}>
                    <label htmlFor='password'>Password</label>
                    <input className={classes.passwordInput} type='password' id='password' ref={passwordInputRef}/>
                    {!formInputsValidity.password && <p>Please enter a valid password!</p>}
                    {formInputsValidity.password && formInputsValidity.email && !formInputsValidity.userExists && <p>That combination of email and password doesn't seem to exist!</p>}
                </div>
                <div className={classes.actions}>
                    <button className={classes.submit}>Log in</button>
                </div>
            </form>
            <div>Don't have an account?
                <Link to={"/register"} style={{"margin": "0rem 0.2rem"}}>
                   <span className={loginClasses.link}> Click here to register </span></Link>
            </div>
            <div style={{"marginRight": "30rem"}}>
            <Link to={"/"} style={{"margin": "0rem 0.2rem"}}>
                <span className={loginClasses.link}>Back to homepage</span></Link>
            </div>
        </div>
    );
}

export default LoginForm;