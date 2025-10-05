import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AboutComponent from '../AboutComponent';
import DashboardComponent from '../DashboardComponent';
import PageNotFoundComponent from '../PageNotFound';
import Navbar from './Navbar';
import Login from '../JsPages/login_component'; 
import SignUp from "../JsPages/signup_component";
import UserDetails from "../JsPages/userDetails";
import ProtectedRoute from "../JsPages/ProtectedRoute";
import AdminHome from "../JsPages/adminHome";
import Product from "../JsPages/products";
import About from "../JsPages/about";
function RouterJsxModule() {
 //const role = ['Admin', 'User'];
// Generate a random index
//const randomIndex = Math.floor(Math.random() * role.length);
// Get the random value
const userType = window.sessionStorage.getItem("userType");
  
const isLoggedIn = window.sessionStorage.getItem("loggedIn"); // Simulating authentication status
console.log("userType", userType);
console.log("isLoggedIn", isLoggedIn);
 window.sessionStorage.setItem("loggedIn",isLoggedIn);
   return (
    <Router>
     <div > <Navbar  isLoggedIn={isLoggedIn} userType={userType} /></div>
      <div className="App centered-div">
        
        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/login" element={<Navigate to="/" />} /> */}
            <Route path="/register" element={<Navigate to="/" />} />
            {userType != "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/products" element={<Product />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/products" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminHome />} />
              </>
            )}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFoundComponent/>} />
          <Route path="/dashboard" element={<DashboardComponent />} />
           <Route path="/about" element={<About />} />
            <Route path="/about2" element={<AboutComponent />} />
        </Routes>
      </div>
    </Router>
  );
}
export default RouterJsxModule;