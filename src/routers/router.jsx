import React from 'react'
import PropTypes from 'prop-types'
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Login from '../Page/Login/Login';
import Register from '../Page/Register/Register';
import Home from '../Page/Home/Home';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRoute>
                        <Home></Home>
                    </PrivateRoute>
                ),
            },
            { path: "/login", element: <Login></Login> },
            { path: "/register", element: <Register></Register> },
        ],
    },
]);

router.propTypes = {}

export default router