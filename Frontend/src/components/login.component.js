import React, { useState } from "react";
import { Input } from './Input'
import { FormProvider, useForm } from 'react-hook-form'
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import userService from "../services/user.service";
import {
  username_validation,
  desc_validation,
  email_validation,
  num_validation,
  password_validation,
} from '../utils/inputValidations'
import { GrMail } from 'react-icons/gr'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { withRouter } from '../common/with-router';
import * as moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../images/TJSS Logo.png'
import HomePicture from "../images/homepicture.jpg"
import "./login.component.css"
import { Modal } from './Modal';



export const Login = ({ getuserData }) => {

  const [credential, setCredential] = useState({
    email: ""
  })
  const methods = useForm()

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [state, setState] = useState({
    message: "",
    loading: false
  })
  const [modalopen, setModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const updatePassword = (data) => {
    console.log("password from modal", data.newPassword)
    console.log("DOB from modal", data.dateofbirth)
    console.log("email to DB", data.email)

   

  }

  const onSubmit = methods.handleSubmit(data => {

    console.log("email", data.email)
    console.log("password", data.password)

    setCredential((prevData) => ({
      ...prevData,
      email: data.email
    }))
    if (data.password === "newemployee") {
      setPasswordModalOpen(true);
     
    
    }
    else

      AuthService.login(data.email, data.password)
        .then(response => {
          { setIsLoginSuccess(true) }

          console.log("response from database", response)
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          getuserData(response.data)
          return response.data;
        },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setState({
              loading: false,
              message: resMessage
            });
          }
        )
        .catch(error => console.log(error))

    console.log(data)

    methods.reset()

  })


  if (isLoginSuccess) {
    return <Navigate to={"/profile"} />        //Edit this to move to profile after completed password
  }
  return (
    <>
    <div id="login-component" className={passwordModalOpen ? "inactive" : ""}>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="column1">
         {/*   <div className="">  */}  {/* used this classname col-10*/}
              <div className="image">
                <img
                  src={Logo}
                  alt="profile-img"
                  className="profile-img-card"
                />
              </div>
              <FormProvider {...methods}>
                <form
                  onSubmit={e => e.preventDefault()}
                  noValidate
                  autoComplete="off"
                >
                  <div className="emailField">
                    <Input {...email_validation}
                      autoFocus="autoFocus"
                      rowLabel="form-group row"
                      columnLabel1="col-sm-2 col-form-label"
                      columnLabel2="col-sm-10"
                      inputClassName="form-control" />
                  </div>
                  <div className="passwordField">
                    <Input {...password_validation}
                      rowLabel="form-group row"
                      columnLabel1="col-sm-2 col-form-label"
                      columnLabel2="col-sm-10"
                      inputClassName="form-control" />
                  </div>

                  <div className="submitButton">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={onSubmit}
                    >
                      <span>Login</span>
                    </button>
                  </div>


                </form>
              </FormProvider>
              {state.message &&
                <div className="form-group">
                  <div
                    className={
                      state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {state.message}
                  </div>
                </div>
              }

              


         {/*   </div>*/}
          </div>
        </div>
        <div className="col">
         {/* <div className="column2"> */}
            <div className="homepage-image">{/*used this classname col-2 */}
              <img
                src={HomePicture}
                alt="profile-img"
                className="profile-img-home"
              />
            </div>
         {/* </div>*/}
        </div>
        </div>
    </div>
    </div>
        {
                passwordModalOpen &&
                <Modal
                  closeModal={() => {
                    setPasswordModalOpen(false)
                  }}
                  onClose={() => {
                    setPasswordModalOpen(false)
                  }}
                  isPasswordOpen = {passwordModalOpen}
                  receivePassword={updatePassword}
                  email={credential.email} />
              }
      
    </>
  );
}


