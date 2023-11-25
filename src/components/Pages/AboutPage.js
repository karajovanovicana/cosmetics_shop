import CartProvider from "../../store/CartProvider";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import Products from "../Products/Products";
import React, {useState} from "react";
import classes from "../Products/ProductsSummary.module.css";
import Footer from "../Layout/Footer";

const AboutPage = () => {

    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };
    // <section className={classes.summary}>
    //     <h2>Delicious Food, Delivered To You</h2>
    //     <p>
    //         Choose your favorite meal from our broad selection of available meals
    //         and enjoy a delicious lunch or dinner at home.
    //     </p>
    //     <p>
    //         All our meals are cooked with high-quality ingredients, just-in-time and
    //         of course by experienced chefs!
    //     </p>
    // </section>

    return (
        <div>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            <Header onShowCart={showCartHandler} />
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            <main>
                <section className={classes.summary}>
                    <h2>Makeup and sanitary products</h2>
                    <p>
                        Step into our world of colors, textures, and endless possibilities.
                        Our mission is to inspire and enhance your natural beauty through products that
                        not only look good but also feel good.
                        We look forward to being
                        a part of your beauty routine and helping you become the best version of yourself.
                    </p>
                    <p>
                        Click and order your favorites from our site.
                        Thank you for choosing our cosmetics.
                    </p>
                    <p>
                        Address: Some Street, 12, Skopje
                    </p>
                    <p>
                        Contact: cosmetics-shop@email.com, +389 00 000 000
                    </p>
                </section>
            </main>
            <div style={{"marginTop": "400px"}}>
            <Footer/>
            </div>
        </div>
    );
}

export default AboutPage;