import {Fragment, useContext} from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom';
import LoginContext from "../../store/login-context";
import ProfileDropdown from "../Profile/ProfileDropdown";

const Header = (props) => {

    const loginCtx = useContext(LoginContext);

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Cosmetics Shop</h1>
                <nav>
                    <ul className={classes.horizontalList}>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                } end
                            >
                                About
                            </NavLink>
                        </li>
                        {loginCtx.loggedInUser.role === "admin" && loginCtx.isLoggedIn === true &&
                            <li>
                            <NavLink
                                to="/add"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                } end
                            >
                                Add New Product
                            </NavLink>
                        </li>}
                        {loginCtx.loggedInUser.role === "admin" && loginCtx.isLoggedIn === true &&
                            <li>
                            <NavLink
                                to="/assign-role"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                } end
                            >
                                Assign Role
                            </NavLink>
                        </li>}
                        {loginCtx.loggedInUser.role === "user" &&  <li style={{"padding": "3.5rem"}}></li>}
                        {loginCtx.loggedInUser.role === "none" &&  <li style={{"padding": "14.5rem"}}></li>}
                    </ul>
                </nav>
                <ul> <li style={{"display": "inline"}}>
                {props.onShowCart && loginCtx.isLoggedIn && loginCtx.loggedInUser.role === "user" &&
                    <HeaderCartButton onClick={props.onShowCart} />}
                </li>
                </ul>
                {loginCtx.isLoggedIn === false && <NavLink
                    style={{"color": "white", "textDecoration": "none"}}
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    } end
                >
                    <ul className={classes.horizontalList}>
                    <li>
                        <button className={classes.button} style={{"fontSize": "1.1rem"}}>
                    Login
                        </button>
                    </li>
                    </ul>
                </NavLink>}

                {loginCtx.isLoggedIn === true && <ul className={classes.horizontalList}>
                        <ProfileDropdown/>
                    </ul>}
            </header>
            <div className={classes['main-image']}>
            </div>
        </Fragment>
    );
};

export default Header;
