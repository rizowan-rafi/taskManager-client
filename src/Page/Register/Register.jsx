import React from "react";
import PropTypes from "prop-types";
import background from "../../assets/background/background1.png";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = (props) => {
    const { createUser, signInWithGoogle, loading, updateUserProfile } =
        useAuth();
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = {name: name, email: email}
        createUser(email, password).then((res) => {
            updateUserProfile(name).then(async (res) => {
                const result = await fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user
                    }),
                });
                if (result.status === 201) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration successfully done",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                  navigate("/");  
                  form.reset();
                } 
            });
        });
    };
    const handlegoogleRegister = () => {
        signInWithGoogle().then(async (res) => {
            const user = {
                name: res.user.displayName,
                email: res.user.email,
            }
            console.log(res.user)
                const result = await fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user
                    }),
                });
                if (result.status === 201) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration successfully done",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
            } 
                else if (result.status === 409) {
                    navigate('/')
            }
        });
    };
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }
    return (
        <div
            style={{
                backgroundImage: `url(${background})`, // ✅ Correct way to set backgroundImage
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className={`w-full flex justify-center items-center h-screen`}
        >
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-background bg-clip-padding backdrop-filter backdrop-blur bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100">
                <h1 className="text-4xl font-bold text-center text-primary">
                    Register
                </h1>
                <form
                    onSubmit={handleRegister}
                    noValidate=""
                    action=""
                    className="space-y-6 text-text"
                >
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Name" className="block font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full px-4 py-3 rounded-md   "
                            fdprocessedid="2zgzl"
                        />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Email" className="block font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
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
                    </div>
                    <button
                        className="block w-full p-3 text-center rounded-sm bg-accent text-background font-bold "
                        fdprocessedid="cxy6mq"
                    >
                        Register
                    </button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">
                        SignUp with social accounts
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
                    Already have an account?
                    <Link
                        to={"/login"}
                        rel="noopener noreferrer"
                        href="#"
                        className="underline dark:text-gray-800"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

Register.propTypes = {};

export default Register;
