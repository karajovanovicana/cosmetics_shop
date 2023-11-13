import RegisterForm from "../Authentication/RegisterForm";


function RegisterPage() {

    const registerHandler = async (userData) => {
        await fetch('https://cosmetics-shop-328c7-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify({
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                password: userData.password,
                userRole: userData.userRole
            }),
        });
    };


    return <RegisterForm onConfirm={registerHandler}></RegisterForm>;
}

export default RegisterPage;
