import {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../Layout/Header";
import classes from "./RegisterForm.module.css";
import LoginContext from "../../store/login-context";


const RegisterForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();
    const loginCtx = useContext(LoginContext);

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
        let userRole = "user";

        if (enteredName === "admin") {
            userRole = "admin";
        }

        props.onConfirm({
            name: enteredName,
            surname: enteredSurname,
            email: enteredEmail,
            password: enteredPassword,
            userRole: userRole
        });
        navigate("/");
        loginCtx.register();
    };

    // const nameControlClasses = `${classes.control} ${
    //     formInputsValidity.name ? '' : classes.invalid
    // }`;
    // const surnameControlClasses = `${classes.control} ${
    //     formInputsValidity.description ? '' : classes.invalid
    // }`;
    // const imageControlClasses = `${classes.control} ${
    //     formInputsValidity.image ? '' : classes.invalid
    // }`;
    // const priceControlClasses = `${classes.control} ${
    //     formInputsValidity.price ? '' : classes.invalid
    // }`;

    return (
        <div className={classes.form}>
            {/*<Header />*/}
            <h1 className={classes.title}>Registration</h1>
            <form onSubmit={registerHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' ref={nameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='surname'>Surname</label>
                    <input type='text' id='surname' ref={surnameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={passwordInputRef} style={{"fontSize": "0.6rem"}} />
                </div>
                <div className={classes.actions}>
                <button className={classes.submit}>Register</button>
                </div>
            </form>
            <div>Already have an account?<Link to={"/login"} style={{"margin": "0rem 0.2rem"}}>Click here to log in</Link></div>
        </div>
    );

}

export default RegisterForm;