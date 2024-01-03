import React from 'react';
import { useSelector } from 'react-redux';
import {Outlet} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function PrivateRoute(props) {
    const {currentUser} = useSelector((state) => state.user);
    return currentUser ? <Outlet />:<Navigate to="/login" />
}

export default PrivateRoute;