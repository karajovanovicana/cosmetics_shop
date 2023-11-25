import React, {useContext, useState} from 'react';
import classes from './ProfileDropdown.module.css'
import LoginContext from "../../store/login-context";
import {NavLink, useNavigate} from "react-router-dom";
import OrderContext from "../../store/order-context";
import cartContext from "../../store/cart-context";

const ProfileDropdown = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const loginCtx = useContext(LoginContext);
    const cartCtx = useContext(cartContext);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const logoutHandler = () => {
        if(loginCtx.loggedInUser.role === "user") {
            localStorage.setItem(`${loginCtx.loggedInUser.email}cart`, JSON.stringify(cartCtx.cart));
            localStorage.setItem(`user-${loginCtx.loggedInUser.email}-productCounter`, JSON.stringify(cartCtx.productCounter));
            localStorage.setItem(`user-${loginCtx.loggedInUser.email}-totalAmount`, JSON.stringify(cartCtx.totalAmount));
        }
        loginCtx.logout();
        navigate("/login");
    }

    const orderPageHandler = () => {
        navigate("/orders");
    }

    const changePasswordPageHandler = () => {
        navigate("/change-password");
    }


    return (
        <div className={classes.profileDropdown}>
            <div className={classes.profileHeader} onClick={toggleDropdown}>
                {/*<img*/}
                {/*    className="profile-picture"*/}
                {/*    src="path/to/profile-picture.jpg"*/}
                {/*    alt="Profile"*/}
                {/*/>*/}
                <span className={classes.profileName}>{loginCtx.loggedInUser.email}</span>
                <i className={`${classes.arrow} ${isDropdownOpen ? classes.up : classes.down}`} />
            </div>

            {isDropdownOpen && (
                <div className={classes.dropdownContent}>
                    {/* Dropdown content goes here */}
                    <ul>
                        {loginCtx.loggedInUser.role === "user" && <li onClick={orderPageHandler}>Orders</li>}
                        {loginCtx.loggedInUser.role === "admin" && <li onClick={orderPageHandler}>All User Orders</li>}
                        {loginCtx.isLoggedIn && <li onClick={changePasswordPageHandler}>Change Password</li>}
                        <li onClick={logoutHandler}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
