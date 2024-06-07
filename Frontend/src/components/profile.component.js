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
          {userready &&

            <div>

              <h1 className="profileheading">
                <strong> Profile</strong>
              </h1>

              <div className="profilelist">

                <div className="rowprofile">
                  <div className="row row-cols-3 mb-3 ">  {/*align-items-start */}

                    <div className="col-sm-5">
                      <strong>  Id</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {currentUser.id}
                    </div>

                  </div>

                  <div className="row  row-cols-3 mb-3"> {/*align-items-start */}

                    <div className="col-sm-5">
                      <strong>Firstname</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {currentUser.firstname}
                    </div>
                  </div>

                  <div className="row  row-cols-3 mb-3"> {/*align-items-start */}

                    <div className="col-sm-5">
                      <strong>Lastname</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {currentUser.lastname}
                    </div>
                  </div>

                  <div className="row  row-cols-3 align-items-start mb-3">

                    <div className="col-sm-5">
                      <strong>Email</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {currentUser.email}
                    </div>
                  </div>

                  <div className="row  row-cols-3 align-items-start mb-3">

                    <div className="col-sm-5">
                      <strong>Date of joining</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {new Date(currentUser.dateofjoining).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="row  row-cols-3 align-items-start mb-3">

                    <div className="col-sm-5">
                      <strong>Date of birth</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {new Date(currentUser.dateofbirth).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="row  row-cols-3 align-items-start mb-3">

                    <div className="col-sm-5">
                      <strong>Department</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {currentUser.department}
                    </div>
                  </div>
                  <div className="row  row-cols-3 align-items-start mb-3">

                    <div className="col-sm-5">
                      <strong>Position</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {currentUser.position}
                    </div>
                  </div>

                  <div className="row  row-cols-3 align-items-start mb-3">

                    <div className="col-sm-5">
                      <strong>Reporting to</strong>
                    </div>

                    <div className="col-sm-1">
                      :
                    </div>

                    <div className="col-sm-6">
                      {currentUser.reportingto}
                    </div>
                  </div>

                  <div className="row  row-cols-3 align-items-start mb-3">
                    {skills.length > 0 &&
                      <>

                        <div className="col-sm-5">
                          <strong>Technologies</strong>
                        </div>

                        <div className="col-sm-1">
                          :
                        </div>
                        <div className="col-sm-6">
                          <ul className="techmap"> {skills.map((list, index) => <li key={index}>{list}</li>)}</ul>
                        </div>

                      </>
                    }
                  </div>

                </div>


              </div>
            </div>
          }

        </div>

      </div>


    </>
  );
}
