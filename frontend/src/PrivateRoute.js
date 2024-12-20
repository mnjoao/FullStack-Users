import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
