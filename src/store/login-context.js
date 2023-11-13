import {createContext} from "react";

const LoginContext = createContext({
    isLoggedIn: false,
    loggedInUser: null,
    login: (username, password) => {},
    logout: () => {},
    register: () => {},
    users: [],
    changeRoleHandler: () => {}
});

export default LoginContext;