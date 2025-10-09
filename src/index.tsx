/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutComponent from './AboutComponent';
import DashboardComponent from './DashboardComponent';
import PageNotFoundComponent from './PageNotFound';
import Navbar from './utility/Navbar';
import Login from './JsPages/login_component'; 
import SignUp from "./JsPages/signup_component";
import UserDetails from "./JsPages/userDetails";
import ProtectedRoute from "./JsPages/ProtectedRoute";
import AdminHome from "./JsPages/adminHome";
import Product from "./JsPages/products";
import About from "./JsPages/about";
import VirtulizationDemp from './PerfomanceOption/Virtualization';
import App from './App';


// Define your routes
const route_Provider = false; // Change this to false to use RouterJsxModuleWithRouteProvider
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <DashboardComponent />,
  },
  {
    path: '/about',
    element: <About />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// FOR DIFFERENT Way you can check APP.tsx
if (route_Provider) {
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}