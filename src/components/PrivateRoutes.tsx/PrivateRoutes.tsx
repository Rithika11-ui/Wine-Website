import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }: { 
  children: React.ReactNode, 
  requiredRole?: number  
}) { 
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("users") || '{}');

  if (!token || token === "undefined") return <Navigate to="/signin" replace />;
  
  if (requiredRole !== undefined && user?.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}