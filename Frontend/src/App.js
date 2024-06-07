import React, { Component, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import { Login } from "./components/login.component";
import Register from "./components/register.component";
import { Home } from "./components/home.component";
import { Profile } from "./components/profile.component";
import { BoardUser } from "./components/board-user.component";
/*import BoardModerator from "./components/board-moderator.component";*/
import { BoardAdmin } from "./components/board-admin.component";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

export default function App() {



    const [showAdminBoard, setShowAdminBoard] = useState(false)
    //const [showModeratorBoard, setShowModeratorBoard] = useState(false)
    const [showUserBoard, setShowUserBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user)
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
            //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))
            setShowUserBoard(user.roles.includes("ROLE_USER"))

        }

        //  EventBus.on("logout", () => { logOut() })
        // return () => { EventBus.remove("logout") }

    }, [])
    //console.log("user from App.js",user)
    const logOut = () => {
        AuthService.logout()
        setCurrentUser(undefined)
        setShowAdminBoard(false)
        //setShowModeratorBoard(false)
        setShowUserBoard(false)
    }

    const handleNavBar = (data) => {

        setCurrentUser(data)
        setShowAdminBoard(data.roles.includes("ROLE_ADMIN"))
        //setShowModeratorBoard(data.roles.includes("ROLE_MODERATOR"))
        setShowUserBoard(data.roles.includes("ROLE_USER"))
    }
    const [currentId, setCurrentId] = useState(0)
    function receiveIdEmployee(data) {
        setCurrentId(data)
    }
    const [skills, setSkills] = useState({
        idEmployee: "",
        skills: ""
    })
    function submitToHRApproval(data) {
        setSkills(() => ({
            idEmployee: data.idEmployee,
            skills: data.skills
        }))
        console.log("idEmployee from app.ja", data.idEmployee)
        console.log("skills  from app.ja", data.skills)
    }
    return (
        <div>
            <nav className="navbar  navbar-expand-lg navbar-dark bg-dark fixed-top"> {/* fixed-top */}

                <div className="collapse navbar-collapse">
                    {!currentUser && (
                        <Link to={"/"} className="navbar-brand">
                            TJSS
                        </Link>
                    )}
                    <ul className="navbar-nav mr-auto">
                        {!currentUser && (
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                            </li>
                        )}




                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {showUserBoard && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    Skills
                                </Link>
                            </li>
                        )}


                        {currentUser && (
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        )}

                        {!currentUser && (
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        )}

                        {/*  <ul className="navbar-nav ml-auto">*/}
                        {!currentUser && (
                            <li className="nav-item">
                                <Link to={"/services"} className="nav-link">
                                    Services
                                </Link>
                            </li>
                        )}
                        {!currentUser && (
                            <li className="nav-item">
                                <Link to={"/contact"} className="nav-link">
                                    Contact us
                                </Link>
                            </li>
                        )}
                        {/*  </ul>*/}
                    </ul>
                </div>
            </nav>




            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login getuserData={handleNavBar} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile id={receiveIdEmployee} />} />
                    <Route path="/user" element={<BoardUser currentEmployeeId={currentId}
                        submitRequestToHR={submitToHRApproval} />} />
                    {/*   <Route path="/mod" element={<BoardModerator />} />*/}
                    <Route path="/admin" element={<BoardAdmin
                        pendingApproval={skills} />} />

                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>

        </div>
    );
}

