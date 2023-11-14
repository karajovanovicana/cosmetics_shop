import React, {useEffect, useState} from "react";
import OrderContext from "./order-context";

const OrderProvider = (props) => {
    const [orders, setOrders] = useState([]);
    const [isOrderAdded, setIsOrderAdded] = useState(false);
    const orderAddedHandler = () => {
        setIsOrderAdded(true);
    }

    useEffect(() => {
        const fetchAllOrdersHandler = async () => {
            try {
                const response = await fetch(
                    'https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/orders.json'
                );

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const responseData = await response.json();

                const loadedOrders = [];

                for (const key in responseData) {
                    loadedOrders.push({
                        id: key,
                        date: responseData[key].date,
                        orderedItems: responseData[key].orderedItems,
                        user: responseData[key].user,
                    });
                }

                setOrders(loadedOrders);
                console.log(orders);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setIsOrderAdded(false);
        };

        fetchAllOrdersHandler(); // Call the function to fetch and load products.
    }, [isOrderAdded]);

    return (
        <OrderContext.Provider value={{ orders, orderAddedHandler }}>
            {props.children}
        </OrderContext.Provider>
    );}

export default OrderProvider;