import Header from "../Layout/Header";
import classes from "./AllOrders.module.css";
import { useContext, useState } from "react";
import LoginContext from "../../store/login-context";
// import classes from "./AddNewProduct.module.css";

const AllOrders = (props) => {
    const loginCtx = useContext(LoginContext);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filterEmail, setFilterEmail] = useState("");

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleEmailChange = (event) => {
        setFilterEmail(event.target.value);
    };

    const filteredOrders = props.orders.filter((order) => {
        const orderDate = new Date(order.date);
        const startFilter = !startDate || orderDate >= new Date(startDate);
        const endFilter = !endDate || orderDate <= new Date(endDate);
        const emailFilter =
            loginCtx.loggedInUser.role === "admin" &&
            (!filterEmail || order.user.email.includes(filterEmail));
        const userFilter =
            loginCtx.loggedInUser.role === "user" &&
            order.user.email === loginCtx.loggedInUser.email;

        return (
            (loginCtx.loggedInUser.role === "admin" && startFilter && endFilter && emailFilter) ||
            (loginCtx.loggedInUser.role === "user" && startFilter && endFilter && userFilter)
        );
    });

    return (
        <div style={{ margin: "-10rem 5rem" }}>
            {loginCtx.loggedInUser.role === "user" && <h2>Order List</h2>}
            {loginCtx.loggedInUser.role === "admin" && (
                <h2>All User Orders List</h2>
            )}
            <div>
                {loginCtx.loggedInUser.role === "admin" && (
                    <div className={classes.control}>
                        {/*<label htmlFor="filterEmail" style={{"display": "none"}}>Email: </label>*/}
                        <input
                            type="text"
                            id="filterEmail"
                            value={filterEmail}
                            onChange={handleEmailChange}
                            placeholder="Search by email"
                            style={{"width": "15rem", "height": "2rem"}}
                        />
                    </div>
                )}
                <div className={classes.control}>
                <label htmlFor="startDate">Start Date: </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    style={{"width": "13rem", "height": "2rem"}}
                />
                </div>
                <div></div>
                <div className={classes.control}>
                <label htmlFor="endDate">End Date: </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    style={{"width": "13rem", "height": "2rem"}}
                />
                </div>
            </div>
        <div></div>
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
                <tbody>
                {filteredOrders.map((order, index) => (
                    <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.date.substring(0, 24)}</td>
                        <td>
                            {order.orderedItems.map((item) => (
                                <td key={item.id}>
                                    {item.name} x {item.amount}{" "}
                                </td>
                            ))}
                        </td>
                        <td>{order.user.totalAmount}</td>
                        <td>{order.user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{"height": "5rem"}}></div>
        </div>
    );
};

export default AllOrders;
