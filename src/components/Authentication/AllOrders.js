import Header from "../Layout/Header";
import classes from "./AllOrders.module.css";
import {useContext, useState} from "react";
import LoginContext from "../../store/login-context";


const AllOrders = (props) => {

    const loginCtx = useContext(LoginContext);

    // const filteredProducts = allProducts.filter((product) =>
    //     product.name.toLowerCase().includes(filterTerm.toLowerCase()) &&
    //     (selectedCategory === '' || product.category === selectedCategory)
    // );

    const userOrders = props.orders.filter((order) => order.user.email === loginCtx.loggedInUser.email);

    return (
        <div style={{"margin": "-10rem 5rem"}}>
            {loginCtx.loggedInUser.role === "user" && <h2>Order List</h2>}
            {loginCtx.loggedInUser.role === "admin" && <h2>All User Orders List</h2>}
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Ordered Items</th>
                    <th>Total amount</th>
                    <th>User Email</th>
                </tr>
                </thead>
                {loginCtx.loggedInUser.role === "user" && <tbody>
                {userOrders.map((order, index) => (
                    <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.date.substring(0, 24)}</td>
                        <td>{order.orderedItems.map(item => (<td key={item.id}>{item.name} x {item.amount} </td>))}</td>
                        <td>{order.user.totalAmount}</td>
                        <td>{order.user.email}</td>
                    </tr>
                ))}
                </tbody> }
                {loginCtx.loggedInUser.role === "admin" && <tbody>
                {props.orders.map((order, index) => (
                    <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.date.substring(0, 24)}</td>
                        <td>{order.orderedItems.map(item => (<td key={item.id}>{item.name} x {item.amount} </td>))}</td>
                        <td>{order.user.totalAmount}</td>
                        <td>{order.user.email}</td>
                    </tr>
                ))}
                </tbody>}
            </table>
        </div>
    );
}

export default AllOrders;