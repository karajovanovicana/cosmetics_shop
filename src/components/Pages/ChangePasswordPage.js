import {useContext} from "react";
import LoginContext from "../../store/login-context";
import ChangePassword from "../Profile/ChangePassword";

function ChangePasswordPage() {

    const loginCtx = useContext(LoginContext);

    const passwordHandler = async (userData) => {
        const user = loginCtx.users.find(user => user.password === userData.password);
        await fetch(`https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: userData.newPassword
            }),
        });
    };

    return <ChangePassword passwordChange={passwordHandler}></ChangePassword>;
}

export default ChangePasswordPage;