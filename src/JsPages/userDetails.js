import React, { Component, useEffect, useState } from "react";
import AdminHome from "./adminHome";
import "../App.css";
import UserHome from "./userHome";
import { Navigate } from "react-router-dom";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    debugger;
    console.log("userType", window.sessionStorage.getItem("userType"));
    console.log("email", window.sessionStorage.getItem("email"));
    console.log("token", window.localStorage.getItem("token"));
    // MOCK
    if (window.sessionStorage.getItem("email").toLowerCase().indexOf("mock") >= 0) {

      setUserData({ fname: window.sessionStorage.getItem("userType"), email: window.sessionStorage.getItem("email") });
    }
    else {
      fetch("http://localhost:5000/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          if (data.data.userType == "Admin") {
            setAdmin(true);
          }

          setUserData(data.data);

          if (data.data == "token expired") {
            alert("Token expired login again");
            window.localStorage.clear();
            window.location.href = "./login";
          }
        });
    }
  }, []);

  return <UserHome userData={userData} />;
}
