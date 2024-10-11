// src/utils/PrivateRoutes.js
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useSelector(state => state.auth);
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
