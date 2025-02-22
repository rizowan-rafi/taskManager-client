import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/background/background1.png";
import useAuth from "../../hooks/useAuth";
const Login = (props) => {
    const { signInUser, loading,signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInUser(email, password).then((res) => {
            navigate("/");
        });
    };

    const handlegoogleRegister = () => {
        signInWithGoogle().then((res) => {
            navigate("/");
        });
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className={`w-full flex justify-center items-center min-h-screen`}
        >
            <div className="w-[80%] lg:max-w-md my-5 mx-auto p-4 lg:p-8 space-y-3 rounded-xl bg-background bg-clip-padding backdrop-filter backdrop-blur bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100">
                <h1 className="text-4xl font-bold text-center text-primary">
                    Login
                </h1>
                <form
                    onSubmit={handleSignIn}
                    noValidate=""
                    action=""
                    className="space-y-6 text-text"
                >
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Email" className="block font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="username"
                            placeholder="email"
                            className="w-full px-4 py-3 rounded-md   "
                            fdprocessedid="2zgzl"
                        />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="password"
                            className="block  font-semibold "
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                            fdprocessedid="dj89d"
                        />
                        <div className="flex justify-end text-xs dark:text-gray-600">
                            <a rel="noopener noreferrer" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <button
                        className="block w-full p-3 text-center rounded-sm bg-accent text-background font-bold "
                        fdprocessedid="cxy6mq"
                    >
                        Sign in
                    </button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">
                        Login with social accounts
                    </p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        aria-label="Log in with Google"
                        className="p-3 rounded-sm"
                        fdprocessedid="t6hlr8"
                        onClick={handlegoogleRegister}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-600">
                    Don't have an account?
                    <Link
                        to={"/register"}
                        rel="noopener noreferrer"
                        href="#"
                        className="underline dark:text-gray-800"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

Login.propTypes = {};

export default Login;
