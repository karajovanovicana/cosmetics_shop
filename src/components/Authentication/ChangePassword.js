import React, {useContext, useRef, useState} from "react";
import loginContext from "../../store/login-context";
import LoginContext from "../../store/login-context";
import classes from "./ChangePassword.module.css";
import {Link, useNavigate} from "react-router-dom";
import Header from "../Layout/Header";
import Modal from "../UI/Modal";


const isEmpty = (value) => value.trim() === '';
const isLengthValid = (value) => value.length >= 6;
const hasNumber = (value) => /\d/.test(value);

const hasUppercase = (value) => /[A-Z]/.test(value);

const hasSpecialChar = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);
const ChangePassword = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        password: true,
        newPassword: true,
        repeatNewPassword: true
    });
    const loginCtx = useContext(LoginContext);
    const passwordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const repeatNewPasswordInputRef = useRef();
    const navigate = useNavigate();
    const [didSubmit, setDidSubmit] = useState(false);

    const clearInputFields = () => {
        passwordInputRef.current.value = '';
        newPasswordInputRef.current.value = '';
        repeatNewPasswordInputRef.current.value = '';
    };

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredPassword = passwordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredRepeatNewPassword = repeatNewPasswordInputRef.current.value;
        const passwordExists = loginCtx.users.some(user => user.password === enteredPassword);

        const enteredPasswordIsValid = !isEmpty(enteredPassword) && passwordExists;
        const enteredNewPasswordIsValid = !isEmpty(enteredNewPassword) && isLengthValid(enteredNewPassword)
            && hasNumber(enteredNewPassword) && hasUppercase(enteredNewPassword) && hasSpecialChar(enteredNewPassword);
        const enteredRepeatNewPasswordIsValid = !isEmpty(enteredRepeatNewPassword) && (enteredRepeatNewPassword === enteredNewPassword);
        setFormInputsValidity({
            password: enteredPasswordIsValid,
            newPassword: enteredNewPasswordIsValid,
            repeatNewPassword: enteredRepeatNewPasswordIsValid
        });

        const formIsValid =
            enteredPasswordIsValid &&
            enteredNewPasswordIsValid && enteredRepeatNewPasswordIsValid;


        if (!formIsValid) {
            return;
        }

        props.passwordChange({
            password: enteredPassword,
            newPassword: enteredNewPassword,
            repeatNewPassword: enteredRepeatNewPassword
        });

        setDidSubmit(true);
        clearInputFields();

    }

    const onClose = () => {
        setDidSubmit(false);
        loginCtx.logout();
        navigate("/login");

    }

    const passwordControlClasses = `${classes.control} ${
        (formInputsValidity.password) ? '' : classes.invalid
    }`;
    const newPasswordControlClasses = `${classes.control} ${
        (formInputsValidity.newPassword) ? '' : classes.invalid
    }`;
    const repeatNewPasswordControlClasses = `${classes.control} ${
        (formInputsValidity.repeatNewPassword) ? '' : classes.invalid
    }`;

    const didSubmitModalContent = (
        <Modal>
            <p>Successfully changed password!</p>
            <p>Please log in with the new password</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={onClose}>
                    Close
                </button>
            </div>
        </Modal>
    );

    return (
        <div className={classes.form}>
            <Header />
            {didSubmit && didSubmitModalContent}
            <h1>Change Password</h1>
            <form onSubmit={confirmHandler}>
                <div className={passwordControlClasses}>
                    <label htmlFor='password'>Old Password</label>
                    <input style={{"fontSize": "0.6rem"}} type='password' id='password' ref={passwordInputRef}  />
                    {!formInputsValidity.password && <p>The password is incorrect</p>}
                </div>
                <div className={newPasswordControlClasses}>
                    <label htmlFor='newPassword'>New Password</label>
                    <input style={{"fontSize": "0.6rem"}} type='password' id='newPassword' ref={newPasswordInputRef}/>
                    {!formInputsValidity.newPassword && <p>Please enter a valid new password!</p>}
                </div>
                <div className={repeatNewPasswordControlClasses}>
                    <label htmlFor='repeatNewPassword'>Repeat New Password</label>
                    <input style={{"fontSize": "0.6rem"}} type='password' id='repeatNewPassword' ref={repeatNewPasswordInputRef}/>
                    {!formInputsValidity.repeatNewPassword && <p>Passwords don't match!</p>}
                </div>
                <div className={classes.actions}>
                    <button className={classes.submit}>Change Password</button>
                </div>
            </form>
        </div>
    );

}

export default ChangePassword;