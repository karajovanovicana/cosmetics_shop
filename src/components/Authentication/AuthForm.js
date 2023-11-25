// import classes from './AuthForm.module.css';
// import { Form, Link, useSearchParams } from "react-router-dom";
//
// function AuthForm() {
//     const [searchParams] = useSearchParams();
//     const isSignUp = searchParams.get('mode') !== 'signup'; // Changed the condition here
//
//     return (
//         <>
//             <Form method="post" className={classes.form}>
//                 <h1>{isSignUp ? 'Log in' : 'Create a new user'}</h1>
//                 <p>
//                     <label htmlFor="email">Email</label>
//                     <input id="email" type="email" name="email" required />
//                 </p>
//                 <p>
//                     <label htmlFor="image">Password</label>
//                     <input id="password" type="password" name="password" required />
//                 </p>
//                 <div className={classes.actions}>
//                     <Link to={`?mode=${isSignUp ? 'signup' : 'login'}`}>
//                         {isSignUp ? 'Create new user' : 'Login'}
//                     </Link>
//                     <button>Save</button>
//                 </div>
//                 <Link to={"/"}>Back to homepage</Link>
//             </Form>
//         </>
//     );
// }
//
// export default AuthForm;
