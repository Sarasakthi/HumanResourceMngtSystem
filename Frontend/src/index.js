/*import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./components/home"
import {EmployeeDetails} from './components/EmployeeDetails';
//import ErrorPage from "./components/Error/errorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    //errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    //errorElement: <ErrorPage />,
  },
  {
    path: "/employeeDetails",
    element: <EmployeeDetails />,
    //errorElement: <ErrorPage />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
  <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);