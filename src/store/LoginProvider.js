import React, {useState, useEffect, useContext} from 'react';
import LoginContext from './login-context';
import CartContext from "./cart-context";

const LoginProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRoleChanged, setIsRoleChanged] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({ role: "none" });
    const [users, setUsers] = useState([]);
    const cartCtx = useContext(CartContext);

    const login = (email, password) => {
        // Find the user with the given email and check the password
        // console.log(loadedUsers);
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            setIsLoggedIn(true);
            setLoggedInUser({ email: user.email, name:user.name, password: user.password, role: user.userRole });
        }
    };


    const logout = () => {
        setIsLoggedIn(false);
        setLoggedInUser({ role: "none" });


            if(loggedInUser.role === "user") {
                localStorage.setItem(`${loggedInUser.email}cart`, JSON.stringify(cartCtx.cart));
                console.log("kcdmnsjwdcks", JSON.stringify(cartCtx.cart));
                console.log("AAkcdmnsjwdcks", JSON.parse(JSON.stringify(cartCtx.cart)));
                localStorage.setItem(`user-${loggedInUser.email}-productCounter`, JSON.stringify(cartCtx.productCounter));
                localStorage.setItem(`user-${loggedInUser.email}-totalAmount`, JSON.stringify(cartCtx.totalAmount));
            }
    };

    const register = () => {
        setIsRegistered(true);
    }

    const changeRoleHandler = () => {
        setIsRoleChanged(true);
    }

    useEffect(() => {
        // Fetch the users when the component mounts
        setTimeout(() => {
            // Code to be executed after the delay
            fetchUsers();
        }, 200);
        setIsRoleChanged(false);
    }, [isLoggedIn, isRegistered, isRoleChanged]);


    const fetchUsers = async () => {
        try {
            const response = await fetch(
                'https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedUsers = [];
            for (const key in responseData) {
                loadedUsers.push({
                    id: key,
                    name: responseData[key].name,
                    surname: responseData[key].surname,
                    email: responseData[key].email,
                    password: responseData[key].password,
                    userRole: responseData[key].userRole,
                });
            }

            // loadedUsers.push(...users);
            setUsers(loadedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setIsRegistered(false);
        setIsRoleChanged(false);
    };

    useEffect(() => {
        console.log(loggedInUser);
        if(loggedInUser.role === "user") {
            console.log("AAA",login.role);
            const storedCart = JSON.parse(localStorage.getItem
            (`${loggedInUser.email}cart`));
            const storedProductCounter = JSON.parse(localStorage.getItem
            (`user-${loggedInUser.email}-productCounter`));
            const storedTotalAmount = JSON.parse(localStorage.
            getItem(`user-${loggedInUser.email}-totalAmount`));

            console.log("sc",storedCart);
            console.log("sc11",storedCart);
            cartCtx.getCartFromStorage(storedCart);
            cartCtx.getProductCounterFromStorage(storedProductCounter);
            cartCtx.getTotalAmountFromStorage(storedTotalAmount);

        }
        else {
            cartCtx.getCartFromStorage([]);
            cartCtx.getProductCounterFromStorage(0);
            cartCtx.getTotalAmountFromStorage(0);
        }
}, [loggedInUser]); // Add this useEffect to log loggedInUser when it changes

    return (
        <LoginContext.Provider value={{ isLoggedIn, loggedInUser, login, logout, register, users, changeRoleHandler }}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
