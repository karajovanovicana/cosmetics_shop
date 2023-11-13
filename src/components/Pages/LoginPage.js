import LoginForm from "../Authentication/LoginForm";
import {useContext} from "react";
import LoginContext from "../../store/login-context";
import LoginProvider from "../../store/LoginProvider";

function LoginPage() {

    const loginCtx = useContext(LoginContext);

    const loginHandler = async (userData) => {
        // await fetch('https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: productData.name,
        //         description: productData.description,
        //         image: productData.image,
        //         price: productData.price,
        //     }),
        // });
        loginCtx.login(userData.email, userData.password);


    };



    return <LoginForm login={loginHandler}></LoginForm>;
}

export default LoginPage;