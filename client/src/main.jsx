import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import AuthProvider from "./components/Provider/AuthProvider";
import App from "./App";
import LoginState from "./components/Home/LoginState";
import { Link } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import AddFriend from "./components/AddFriend";
import MessagePortal from "./components/Message/MessagePortal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/LoginState",
        element: <LoginState></LoginState>,
      },
      {
        path: "/",
        element: (
          <div className="flex justify-center my-20">
            <Link to="/LoginState" className="btn btn-lg btn-info btn-outline">
              Login
            </Link>
          </div>
        ),
      },
      {
        path: "/createAccount",
        element: <CreateAccount></CreateAccount>,
      },
      {
        path: "/addafriend",
        element: <AddFriend></AddFriend>,
      },
      {
        path: "/messagePortal",
        element: <MessagePortal></MessagePortal>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
