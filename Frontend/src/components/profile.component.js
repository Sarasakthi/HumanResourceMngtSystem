import React, { Component, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import "./profile.component.css";

export const Profile = ({ id }) => {

  const [redirect, setRedirect] = useState(null);
  const [userready, setUserready] = useState(redirect ? false : true);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    email: "",
    roles: [],
    accessToken: "",
    tokenType: "",
    firstname: "",
    lastname: ""
  })
  const [skills, setSkills] = useState([])




  useEffect(() => {
    setCurrentUser((prevData) => ({
      ...prevData,
      id: AuthService.getCurrentUser().id,
      username: AuthService.getCurrentUser().username,
      email: AuthService.getCurrentUser().email,
      roles: AuthService.getCurrentUser().roles,
      accessToken: AuthService.getCurrentUser().accessToken,
      tokenType: AuthService.getCurrentUser().tokenType,
      firstname: AuthService.getCurrentUser().emp.firstname,
      lastname: AuthService.getCurrentUser().emp.lastname,
      dateofbirth: AuthService.getCurrentUser().emp.dateofbirth,
      dateofjoining: AuthService.getCurrentUser().emp.dateofjoining,
      department: AuthService.getCurrentUser().emp.department,
      position: AuthService.getCurrentUser().emp.position,
      reportingto: AuthService.getCurrentUser().emp.reportingto
    }))


    UserService.skillsToShowInUserProfile(AuthService.getCurrentUser().id)
      .then(response => {
        console.log("employee from DB after skills and Doc approved", response.data)
        setSkills(response.data.permanentSkills)
      })
      .catch(error => console.log(error))
  }, [])

  console.log("skills after setSkills", skills)
  if (currentUser) {
    console.log("current employee id within profile", AuthService.getCurrentUser().id)
    id(currentUser.id);
  }


  if (!currentUser) {

    setRedirect("/home")
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <>
      <div className="profile">
        <div className="container">
          {userready ?

            <div>
              <header className="jumbotron">
                <h3>
                  <strong> Profile</strong>
                </h3>
              </header>

              <div className="profilelist">

                <div style={{ display: "none" }}>
                  <strong>Token:</strong>{" "}
                  {currentUser.accessToken}
                </div>

                <p>
                  <strong>Id:</strong>{" "}
                  {currentUser.id}
                </p>
                <p>
                  <strong>Firstname:</strong>{" "}
                  {currentUser.firstname}
                </p>
                <p>
                  <strong>Lastname:</strong>{" "}
                  {currentUser.lastname}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {currentUser.email}
                </p>
                <p>
                  <strong>Date of birth:</strong>{" "}
                  {new Date(currentUser.dateofbirth).toLocaleDateString()}
                </p>
                <p>
                  <strong>Date of joining:</strong>{" "}
                  {new Date(currentUser.dateofjoining).toLocaleDateString()}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {currentUser.department}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  {currentUser.position}
                </p>
                <p>
                  <strong>Reporting to:</strong>{" "}
                  {currentUser.reportingto}
                </p>
                {skills.length > 0 &&
                  <p>
                    <strong>Technologies:</strong>
                    <ul >
                      {skills.map((list, index) => <li key={index}>{list}</li>)}

                    </ul>
                  </p>
                }
                <strong style={{ display: "none" }}>Authorities:</strong>
                <ul style={{ display: "none" }}>
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
              </div>
            </div> : null

          }

        </div>
      </div>


    </>
  );
}
