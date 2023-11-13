import classes from './AssignRoleToUser.module.css'
import {Link, useNavigate} from "react-router-dom";
import Header from "../Layout/Header";
import {useContext, useEffect, useRef, useState} from "react";
import LoginContext from "../../store/login-context";

const AssignRoleToUser = (props) => {

    const loginCtx = useContext(LoginContext);
    const users = loginCtx.users;
    const loggedInUser = loginCtx.loggedInUser;


    const userRef = useRef();
    const roleRef = useRef();
    const navigate = useNavigate();



    const confirmHandler = (event) => {
        event.preventDefault();

        const selectedUser = userRef.current.value;
        const selectedRole = roleRef.current.value;

        props.onConfirm({
            userEmail: selectedUser,
            userRole: selectedRole,
        });
        navigate("/");
        loginCtx.changeRoleHandler();

    }

    return (
        <div className={classes.form}>
            <Header />
            <h1>Assign Role To User</h1>
            <form onSubmit={confirmHandler}>
                <div className={classes.control}>
                    <label htmlFor='user_dropdown'>Users:</label>
                    <select id="user_dropdown" ref={userRef}>
                        {users.map(user => {
                            if (user.email !== loggedInUser.email) {
                                return (
                                    <option key={user.id} value={user.email}>
                                        {user.email} (current role: {user.userRole})
                                    </option>
                                );
                            }
                            return null;
                        })}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="role_dropdown">Roles:</label>
                    <select id="role_dropdown" ref={roleRef}>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button className={classes.submit}>Change Role</button>
                </div>
            </form>
        </div>
    );
}

export default AssignRoleToUser;