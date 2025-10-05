import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  debugger;
  const isLoggedIn = window.sessionStorage.getItem("loggedIn");
  console.log("isLoggedIn in ProtectedRoute", isLoggedIn);

  return isLoggedIn === "true" ?
    <div className="d-flex justify-content-center align-items-top fitToPage">  <Outlet /></div>
    :
    <div className="d-flex justify-content-center align-items-top fitToPage">   <Navigate to="login" /></div>

    ;
}

export default ProtectedRoute;
