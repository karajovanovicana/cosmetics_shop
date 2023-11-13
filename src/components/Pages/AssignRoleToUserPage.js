import AssignRoleToUser from "../Authentication/AssignRoleToUser";
import {useContext} from "react";
import LoginContext from "../../store/login-context";


function AssignRoleToUserPage() {
    const loginCtx = useContext(LoginContext);
    const changeRoleHandler = async (userData) => {
        loginCtx.changeRoleHandler();

        const userChangeRole = loginCtx.users.find(user => user.email === userData.userEmail);

        await fetch(`https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/users/${userChangeRole.id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userRole: userData.userRole,
            }),
        });
    };

    return <AssignRoleToUser onConfirm={changeRoleHandler} />;
}

export default AssignRoleToUserPage;