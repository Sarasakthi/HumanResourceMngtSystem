import React, { Component, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function Profile() {

  const [redirect, setRedirect] = useState(null);
  const [userready, setUserready] = useState(redirect ? false : true);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    email: "",
    roles: [],
    accessToken: "",
    tokenType: ""
  })


 

  useEffect(() => {
    setCurrentUser((prevData) => ({
      ...prevData,
      id:  AuthService.getCurrentUser().id,
      username:  AuthService.getCurrentUser().username,
      email:  AuthService.getCurrentUser().email,
      roles:  AuthService.getCurrentUser().roles,
      accessToken:  AuthService.getCurrentUser().accessToken,
      tokenType:  AuthService.getCurrentUser().tokenType
    }))

  }, [])

 
 
  
  if (!currentUser) {

    setRedirect("/home")
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="container">
      {userready ?
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div> : null}
    </div>
  );
}
