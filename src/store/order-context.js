import {createContext} from "react";

const OrderContext = createContext({
    orders: [],
    orderAddedHandler: () => {},
});

export default OrderContext;