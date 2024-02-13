import React, { useState } from "react";
import { Input } from './Input'
import { FormProvider, useForm } from 'react-hook-form'
import AuthService from "../services/auth.service";
import {
  username_validation,
  desc_validation,
  email_validation,
  num_validation,
  password_validation,
} from '../utils/inputValidations'
import { GrMail } from 'react-icons/gr'
import { BsFillCheckSquareFill } from 'react-icons/bs'


export default function Register() {

  const methods = useForm()

  const [state, setState] = useState({
    message: "",
    successful: false
  })

  const onSubmit = methods.handleSubmit(data => {

    AuthService.register(data.name, data.email, data.password)
      .then(
        response => {
          setState({
            message: response.data.message,
            successful: true
          })

        }

        ,
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            successful: false,
            message: resMessage
          });
        }
      );


    methods.reset()

  })


  return (
    <div>

      <div className="container">
        <FormProvider {...methods}>
          <form
            onSubmit={e => e.preventDefault()}
            noValidate
            autoComplete="off"

          >
            <Input {...username_validation} />
            <Input {...email_validation} />
            <Input {...password_validation} />

            {state.successful &&
              <p >
                <BsFillCheckSquareFill />  Form has been submitted successfully

              </p>
            }

            <button className="btn btn-primary mb-3"
              onClick={onSubmit}
            >
              <GrMail />
              Signup
            </button>

          </form>
        </FormProvider>
      </div>

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

    </div>
  )
}
