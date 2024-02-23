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
import { Passwordmodal } from "./Passwordmodal";
import * as moment from 'moment'





export const Login = ({ getuserData }) => {

  const [credential, setCredential] = useState({
    email: ""
  })


  const updatePassword = (data) => {
    console.log("password from modal", data.newPassword)
    console.log("DOB from modal",data.dateofbirth)
    console.log("email to DB", data.email)
   
    userService.passwordUpdate(data)
    .then(response => console.log(response))
    .catch(error => console.log(error))
    
  }
   
  const methods = useForm()

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [state, setState] = useState({
    message: "",
    loading: false
  })
  const [modalopen, setModalOpen] = useState(false);

  const onSubmit = methods.handleSubmit(data => {

    console.log("email", data.email)
    console.log("password", data.password)

    setCredential((prevData) => ({
      ...prevData,
      email: data.email
    }))
   if (data.password === "newemployee") {
      setModalOpen(true);
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

    <div >
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />

      <FormProvider {...methods}>
        <form
          onSubmit={e => e.preventDefault()}
          noValidate
          autoComplete="off"
        >

          <Input {...email_validation} />
          <Input {...password_validation} />

          <div >
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

      {
        modalopen &&
        <Passwordmodal
          closeModal={() => {
            setModalOpen(false)
           

          }}
          receivePassword={updatePassword}
          email = {credential.email} />
      }


    </div>

  );
}


