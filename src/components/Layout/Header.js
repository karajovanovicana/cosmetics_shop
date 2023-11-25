import {Fragment, useContext} from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Person';
import LoginContext from "../../store/login-context";
import LoginProvider from "../../store/LoginProvider";
import ProfileDropdown from "../Authentication/ProfileDropdown";
import cartContext from "../../store/cart-context";

const Header = (props) => {
  // return (
  //   <Fragment>
  //     <header className={classes.header}>
  //       <h1>Cosmetics Shop</h1>
  //       <HeaderCartButton onClick={props.onShowCart} />
  //     </header>
  //     <div className={classes['main-image']}>
  //     </div>
  //   </Fragment>
  // );

    const loginCtx = useContext(LoginContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        loginCtx.logout();
        navigate("/login");
    }

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
                                // style={({ isActive }) => ({
                                //   textAlign: isActive ? 'center' : 'left',
                                // })}
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
                        {loginCtx.loggedInUser.role === "admin" && loginCtx.isLoggedIn === true && <li>
                            <NavLink
                                to="/add"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                } end
                            >
                                Add New Product
                            </NavLink>
                        </li>}
                        {loginCtx.loggedInUser.role === "admin" && loginCtx.isLoggedIn === true && <li>
                            <NavLink
                                to="/assign-role"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                } end
                            >
                                Assign Role
                            </NavLink>
                        </li>}
                        {/*{loginCtx.loggedInUser.role === "user" && loginCtx.isLoggedIn === true && <li>*/}
                        {/*    {loginCtx.isLoggedIn && loginCtx.loggedInUser.role === "user" && <HeaderCartButton onClick={props.onShowCart} />}*/}
                        {/*</li>}*/}
                        {/*{loginCtx.loggedInUser.role === "user" && loginCtx.isLoggedIn === true && <li>*/}
                        {/*    <span style={{"opacity": "0"}}>*/}
                        {/*        add new product*/}
                        {/*    </span>*/}
                        {/*</li>}*/}
                        {/*<li>*/}

                        {/*</li>*/}
                    </ul>
                </nav>
                {/*{loginCtx.isLoggedIn && loginCtx.loggedInUser.role === "user" && <HeaderCartButton onClick={props.onShowCart} />}*/}
                <ul> <li style={{"display": "inline", "marginRight": ""}}>
                {props.onShowCart && loginCtx.isLoggedIn && loginCtx.loggedInUser.role === "user" && <HeaderCartButton onClick={props.onShowCart} />}
                </li>
                </ul>
                {!props.onShowCart && loginCtx.loggedInUser.role === "user" &&
                    <div style={{padding: "0.75rem 8rem"}}></div> }
                {!props.onShowCart && loginCtx.loggedInUser.role === "none" &&
                    <div style={{padding: "0.75rem 8rem"}}></div> }
                {props.onShowCart && !loginCtx.isLoggedIn && <div style={{padding: "0.75rem 8rem"}}></div> }
                {/*{props.onShowCart && loginCtx.loggedInUser.role === "admin" && <div style={{padding: "0.75rem 8rem"}}></div> }*/}
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
                    {/*Authentication*/}
                </NavLink>}

                {/*{loginCtx.isLoggedIn === true && <NavLink*/}
                {/*    style={{"color": "white", "textDecoration": "none"}}*/}
                {/*    to="/profile"*/}
                {/*    className={({ isActive }) =>*/}
                {/*        isActive ? classes.active : undefined*/}
                {/*    } end*/}
                {/*>*/}
                {loginCtx.isLoggedIn === true && <ul className={classes.horizontalList}>
                        {/*<li>*/}
                        {/*    <button className={classes.button} style={{"fontSize": "1.1rem"}}>*/}
                        {/*        Profile*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                        <ProfileDropdown/>
                    </ul>}
                {/*</NavLink>}*/}

                {/*{loginCtx.isLoggedIn === true && <NavLink*/}
                {/*    style={{"color": "white", "textDecoration": "none"}}*/}
                {/*    to="/login"*/}
                {/*    className={({ isActive }) =>*/}
                {/*        isActive ? classes.active : undefined*/}
                {/*    } end*/}
                {/*>*/}
                {/*    <ul className={classes.horizontalList}>*/}
                {/*        <li>*/}
                {/*        <button onClick={logoutHandler} className={classes.button} style={{"fontSize": "1.1rem"}}>*/}
                {/*    Logout*/}
                {/*        </button>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</NavLink>}*/}
                    {/*Authentication*/}
                {/*<h3>*/}
                {/*<Link to={"/home"} className={classes.link}>Home Page</Link>*/}
                {/*</h3>*/}
                {/*<h3>*/}
                {/*    <Link to={"/about"} className={classes.link}>About Page</Link>*/}
                {/*</h3>*/}

            </header>
            <div className={classes['main-image']}>
            </div>
        </Fragment>
    );
};

export default Header;
