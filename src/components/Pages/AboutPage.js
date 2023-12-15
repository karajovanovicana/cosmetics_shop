import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import React, {useState} from "react";
import classes from "../Products/ProductsSummary.module.css";
import Footer from "../Layout/Footer";

function AboutPage() {

    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

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