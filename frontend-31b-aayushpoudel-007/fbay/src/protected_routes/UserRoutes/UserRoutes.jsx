import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const UserRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default UserRoutes;