import AllOrders from "../Authentication/AllOrders";
import {useContext} from "react";
import OrderContext from "../../store/order-context";


function AllOrdersPage() {

   const ordersCtx = useContext(OrderContext);
   const orders = ordersCtx.orders;

    return <AllOrders orders={orders}/>;
}

export default AllOrdersPage;