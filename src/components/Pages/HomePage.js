import React, {useState} from "react";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import Products from "../Products/Products";
import DeleteItemModal from "../Products/DeleteItemModal";
import Footer from "../Layout/Footer";

function HomePage() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const showDeleteModalHandler = () => {
        setDeleteModalIsShown(true);
    };


    const hideDeleteModalHandler = () => {
        setDeleteModalIsShown(false);
    };

    return (
        <div>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            {deleteModalIsShown && <DeleteItemModal onClose={hideDeleteModalHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
                <Products onShowDeleteModal={showDeleteModalHandler} />
            </main>
            <Footer/>
        </div>
    );
}

export default HomePage;