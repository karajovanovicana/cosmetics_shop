import React, {useState, useEffect} from 'react';
import LoginContext from './login-context';

const LoginProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRoleChanged, setIsRoleChanged] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({ role: "none" });
    const [users, setUsers] = useState([]);

    const login = (email, password) => {
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            setIsLoggedIn(true);
            setLoggedInUser({ email: user.email, name:user.name, password: user.password, role: user.userRole });
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setLoggedInUser({ role: "none" });
    };

    const register = () => {
        setIsRegistered(true);
    }

    const changeRoleHandler = () => {
        setIsRoleChanged(true);
    }

    useEffect(() => {
        setTimeout(() => {
            fetchUsers().then(() => {});
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

            setUsers(loadedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setIsRegistered(false);
        setIsRoleChanged(false);
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, loggedInUser, login, logout, register, users, changeRoleHandler }}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
