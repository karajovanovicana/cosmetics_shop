import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import {Link, NavLink} from 'react-router-dom';

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
                        <li>
                            <NavLink
                                to="/add"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                } end
                            >
                                Add New Product
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {props.onShowCart && <HeaderCartButton onClick={props.onShowCart} />}
                {!props.onShowCart && <div style={{padding: "0.75rem 8rem"}}></div> }
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
