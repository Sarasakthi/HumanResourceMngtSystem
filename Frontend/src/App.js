import React, { Component, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

export default function App() {

const [state,setState] = useState({
    showAdminBoard : false,
    showModeratorBoard : false,
    showUserBoard : false,
    currentUser : undefined
})
const user = AuthService.getCurrentUser();
    useEffect(() => {

        if (user) {
            setState({
                currentUser : user,
                showUserBoard : user.roles.includes("ROLE_USER"),
                showAdminBoard : user.roles.includes("ROLE_ADMIN"),
                showModeratorBoard : user.roles.includes("ROLE_MODERATOR")
            })
        }
        EventBus.on("logout", () => { logOut() })
        return () => { EventBus.remove("logout") }

    })
    //console.log("user from App.js",user)
    const logOut = () => {
        AuthService.logout()
        setState({
            showModeratorBoard :false,
            showAdminBoard : false,
            currentUser : undefined
        })
        
    }



    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    TJSS
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {state.showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                                Moderator Board
                            </Link>
                        </li>
                    )}

                    {state.showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {state.showUserBoard && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                </div>

                {state.currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {state.currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}

            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user" element={<BoardUser />} />
                    <Route path="/mod" element={<BoardModerator />} />
                    <Route path="/admin" element={<BoardAdmin />} />
                </Routes>
            </div>


        </div>
    );
}


/*-------------------------------------------------------------------
|  🐼 React FC App
|
|  🐯 Purpose: RENDERS REACT APP
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/
/*
import React from 'react'
import { Form } from './Form'
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    return (
        <div>
            <Form />
        </div>
    )
}
*/
