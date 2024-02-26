import React, { Component, useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form'
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Input } from './Input'
import { toUnicodeVariant } from "./alert-bold"
import {
  skills_validation,
  file_validation

} from '../utils/inputValidations'
import userService from "../services/user.service";
import AuthService from "../services/auth.service";
import "./board-user.component.css"
export const BoardUser = ({ currentEmployeeId, submitRequestToHR }) => {


  const [skills, setSkills] = useState({
    idEmployee: "",
    skills: "",
    imageId: ""
  })
  const [selectedFile, setSelectedFile] = useState("")
  const methods = useForm()

  const [state, setState] = useState({
    message: "",
    loading: false
  })

  const [technologies, setTechnologies] = useState([]);
  const [showSkills, setShowSkills] = useState(false)
  const [isSendDataToDB, setIsSendDataToDB] = useState(false)
  const [upload, setUpload] = useState(false);
  useEffect(() => {
    setSkills((prevData) => ({
      ...prevData,
      idEmployee: AuthService.getCurrentUser().id
    }))

    UserService.getTechnology()
      .then(response => {
        console.log(response)
        setTechnologies(response.data)
        setShowSkills(true)
      })
      .catch(error => console.log(error))

  }, []
  )

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

  };


  const onFileUpload = () => {
    if (selectedFile == "") {
      alert("Please attach supporting document!")
    }
    else {
      const formData = new FormData();
      formData.append(
        "File",
        selectedFile);
      console.log("selectedFile", selectedFile);

      userService.submitDocumentToHR(formData)
        .then(response => {
          console.log("response after doc submission  to DB", response)
          setSkills((prevData) => ({
            ...prevData,
           imageId : response.data.id
          }))
        })
        .catch(error => console.log(error))
     // console.log("selecteFile.name - skills.imageName", selectedFile.name)
      
      setUpload(true);
    }
  }

  /*  userService.submitDocumentToHR(formData)
      .then(response => {
        console.log("response from DB after doc submitted", response)
        setSkills((prevData) => ({
          ...prevData,
          imageName: response.data.name
        }))
      })
      .catch(error => console.log(error))*/
  // setUpload(true);

  // };
  console.log("idEmployee from skills", skills.idEmployee)
  console.log("imageId after submitted to DB", skills.imageId)

  let selectedValues = []
  const onSubmit = methods.handleSubmit(data => {

    console.log("Employee selected skills", data)
    selectedValues = Object.values(data)

    setSkills((prevData) => ({
      ...prevData,
      skills: (selectedValues.filter(gettingValues))
    }))

    function gettingValues(item) {
      return (item !== false)
    }
    setIsSendDataToDB(true)


  })



  if (isSendDataToDB) {
    console.log("Skills to DB", skills)

    if (skills.skills.length === 0) { alert("Please choose Technology!") }

    else if (skills.imageId === "" && !upload) { alert("Please choose supporting document and" + toUnicodeVariant('CLICK UPLOAD!', 'bold sans', 'bold')) }

    {
      upload &&
        userService.submitSkiilsToHR(skills)
          .then(response => {
            console.log(response.data)
            alert("Your skills submitted to HR!");

          })
          .catch(error => console.log(error))

      //sending skills values tp App.js
      submitRequestToHR(skills)

      setIsSendDataToDB(false)
      methods.reset();
    }
  }
  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>Skills</h3>
        </header>
        <FormProvider {...methods}>
          <form
            onSubmit={e => e.preventDefault()}
            noValidate
            autoComplete="off"
          >


            {showSkills &&
              <div>
                <Input
                  {...skills_validation}
                  array={technologies}
                />
                <div>
                  <label htmlFor="img">
                    Add supporting Docement
                    <input
                      type="file"
                      id="img"
                      onChange={onFileChange}
                    />
                  </label>
                  <button onClick={onFileUpload}>Upload</button>
                </div>


                <div>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={onSubmit}
                  >
                    <span>Submit</span>
                  </button>
                </div>

              </div>

            }



          </form>
        </FormProvider>

      </div>
    </>
  );
}


/*  UserService.getUserBoard().then(
      response => {
        setState({
          content: response.data
        });
      },
      error => {
        setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    ); */


/*    {state.message &&
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
    } */