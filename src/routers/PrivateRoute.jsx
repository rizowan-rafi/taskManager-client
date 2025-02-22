import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Provider/authProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const location = useLocation();
    if (loading)
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg  text-success"></span>
            </div>
        );
    if (user) return children;
    return <Navigate to="/login" state={location?.pathname}></Navigate>;
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
