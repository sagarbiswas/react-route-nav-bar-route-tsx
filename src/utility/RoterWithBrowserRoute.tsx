import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import VirtulizationDemp from '../PerfomanceOption/Virtualization';
// Define your routes
export default function RouterJsxModuleWithRouteProvider() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'dashboard',
        element: <DashboardComponent />,
      },
    ],
  },
]);
return (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
}

