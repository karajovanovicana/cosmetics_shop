import CartProvider from "../../store/CartProvider";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import Products from "../Products/Products";
import {useState} from "react";
import classes from "../Products/ProductsSummary.module.css";

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
            {/*{cartIsShown && <Cart onClose={hideCartHandler} />}*/}
            <Header />
            <main>
                <section className={classes.summary}>
                    <h2>Makeup and sanitary products</h2>
                    <p>
                        Click and order your favorites from our site.
                    </p>
                    <p>
                        Address: Whatever Street, 12345, Skopje
                    </p>
                    <p>
                        Contact: cosmetics-shop@email.com, 1111111
                    </p>
                </section>
            </main>
        </div>
    );
}

export default AboutPage;