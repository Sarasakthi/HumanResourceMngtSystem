import React, { Component, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import { Login } from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import { Profile } from "./components/profile.component";
import { BoardUser } from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import {BoardAdmin} from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

export default function App() {

    /* const [state, setState] = useState({
         showAdminBoard: false,
         showModeratorBoard: false,
         showUserBoard: false,
         currentUser: undefined
     })*/

    const [showAdminBoard, setShowAdminBoard] = useState(false)
    const [showModeratorBoard, setShowModeratorBoard] = useState(false)
    const [showUserBoard, setShowUserBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user)
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))
            setShowUserBoard(user.roles.includes("ROLE_USER"))
            /* setState({
                 currentUser: user,
                 showUserBoard: user.roles.includes("ROLE_USER"),
                 showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                 showModeratorBoard: user.roles.includes("ROLE_MODERATOR")
             })*/
        }

        //  EventBus.on("logout", () => { logOut() })
        // return () => { EventBus.remove("logout") }

    }, [])
    //console.log("user from App.js",user)
    const logOut = () => {
        AuthService.logout()
        setCurrentUser(undefined)
        setShowAdminBoard(false)
        setShowModeratorBoard(false)
        setShowUserBoard(false)
    }

    const handleNavBar = (data) => {

        setCurrentUser(data)
        setShowAdminBoard(data.roles.includes("ROLE_ADMIN"))
        setShowModeratorBoard(data.roles.includes("ROLE_MODERATOR"))
        setShowUserBoard(data.roles.includes("ROLE_USER"))
    }
    const [currentId, setCurrentId] = useState(0)
    function receiveIdEmployee(data) {
        setCurrentId(data)
    }
const[skills,setSkills] = useState({
    idEmployee : "",
    skills : ""
})
    function submitToHRApproval(data){
        setSkills(()=> ({
            idEmployee : data.idEmployee,
            skills: data.skills
        }))
        console.log("idEmployee from app.ja",data.idEmployee)
        console.log("skills  from app.ja",data.skills)
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

                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                                Moderator Board
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
                                User
                            </Link>
                        </li>
                    )}
                    
                </div>

                {currentUser ?
                    (<div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>)
                    :

                    (<div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">

                                Login
                            </Link>
                        </li>

                    </div>)
                }



            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login getuserData={handleNavBar} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile id={receiveIdEmployee} />} />
                    <Route path="/user" element={<BoardUser currentEmployeeId={currentId}
                                                            submitRequestToHR = {submitToHRApproval} />} />
                    <Route path="/mod" element={<BoardModerator />} />
                    <Route path="/admin" element={<BoardAdmin 
                                                    pendingApproval = {skills}/>} />
                </Routes>
            </div>


        </div>
    );
}

