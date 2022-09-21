import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//protect routes
const ProtectedRoute = () => {
    const auth = null; 
    return (<>{auth ? <Outlet /> 
             : <Navigate to="/" />}</>);
}
export default ProtectedRoute;