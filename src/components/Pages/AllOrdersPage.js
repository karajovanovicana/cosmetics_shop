import AllOrders from "../Authentication/AllOrders";
import React, {useContext, useState} from "react";
import OrderContext from "../../store/order-context";
import Header from "../Layout/Header";
import Cart from "../Cart/Cart";
import DeleteItemModal from "../Products/DeleteItemModal";
import Footer from "../Layout/Footer";


function AllOrdersPage() {

   const ordersCtx = useContext(OrderContext);
   const orders = ordersCtx.orders;
    const [cartIsShown, setCartIsShown] = useState(false);
    const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };


    return <div> {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <AllOrders orders={orders}/>
        {/*<div style={{"marginTop": "657px"}}>*/}
        {/*    <Footer/>*/}
        {/*</div>*/}
    </div>;
}

export default AllOrdersPage;