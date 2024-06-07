import React, { Component, useEffect, useState, useRef } from "react";
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
import { Navigate } from "react-router-dom";

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
  const fileInputRef = useRef();
  const [technologies, setTechnologies] = useState([]);
  const [showSkills, setShowSkills] = useState(false)
  const [isSendDataToDB, setIsSendDataToDB] = useState(false)
  const [upload, setUpload] = useState(false);
  const [approvedSkills, setApprovedSkills] = useState([]);
  const [approvalPending, setApprovalPending] = useState(false);
  const [startFilter, setStartFilter] = useState(false);
  const [skillsDenyed, setSkillsDenyed] = useState(false);
  const [waitinfForApproval, setWaitingForApproval] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [skillsSubmittd, setSkillsSubmitted] = useState(false);

  useEffect(() => {
    setSkills((prevData) => ({
      ...prevData,
      idEmployee: AuthService.getCurrentUser().id
    }))



    UserService.getTechnology()
      .then(response => {
        console.log("Technology from DB - First step ", response)
        //setTechnologies(response.data)
        setTechnologies(
          response.data.map((items) => (items.technologyName)))
        setShowSkills(true)
      })
      .catch(error => console.log(error))



    UserService.skillsToShowInUserProfile(AuthService.getCurrentUser().id)
      .then(response => {
        console.log("employee from DB after skills and Doc approved", response.data)
        setApprovedSkills(response.data.permanentSkills)
      })
      .catch(error => console.log(error))


    userService.approvalWaiting(AuthService.getCurrentUser().id)
      .then(response => {
        console.log("Employee waiting for approval", response.data)

        if (response.data.skillsApproveStatus == false && response.data.denyApproval == null) {
          setApprovalPending(true)
          setShowSkills(false)
          setSkillsDenyed(false)
        }
        if (response.data.skillsApproveStatus == false && response.data.denyApproval == true) {
          setSkillsDenyed(true)
          setShowSkills(false)
          setApprovalPending(false)
        }
        if (response.data.skillsApproveStatus == true && response.data.denyApproval == null) {
          setShowSkills(true)
          setApprovalPending(false)
          setSkillsDenyed(false)
        }
        if (response.data.skillsApproveStatus == null && response.data.denyApproval == null) {
          setShowSkills(true)
          setApprovalPending(false)
          setSkillsDenyed(false)
        }
      })
      .catch(error => console.log(error))

    // setStartFilter(true);

  },
    []
  )

  console.log("approved Skills", approvedSkills)

  const onFileChange = (event) => {
    var f = event.target.files[0];
    var size = f.size;
    var sizeInKB = size / 1024;
    console.log("File size", sizeInKB);

    if (sizeInKB < 60) {
      setSelectedFile(event.target.files[0]);
    }

    else // (sizeInKB > 60) {
    {
      setSelectedFile("");
      fileInputRef.current.value = '';
      alert("File size should be less than 60KB");
    }
  };

  const removeFailedMessage = () => {
    console.log("Browse clicked!")
    if (imageExists) {
      setImageExists(false);
    }
    if (selectedFile) {
      handleRemoveFile();
      setSelectedFile("");
    }
    if (upload) {
      setUpload(false);
    }
  }

  console.log("selected file after change event", selectedFile)
  console.log("selected file name after change event", selectedFile.name)

  const handleRemoveFile = () => {
    userService.removeUploadedImage(selectedFile.name)
      .then(response => { console.log("response from db after image deleted", response) })
      .catch(error => console.log(error))

    // Clear the selected file when the remove button is clicked
    setSelectedFile("");
    setUpload(false);
    fileInputRef.current.value = '';
  };

  const onFileUpload = () => {


    const formData = new FormData();
    formData.append(
      "File",
      selectedFile);
    console.log("selectedFile", selectedFile);

    console.log("reached onFileUpload");
    userService.submitDocumentToHR(formData)
      .then(response => {
        console.log("response after doc submission  to DB", response)
        if (response.data.id) {
          setSkills((prevData) => ({
            ...prevData,
            imageId: response.data.id
          }))
        }
        else {
          setImageExists(true);
          handleRemoveFile();
        }
      })
      .catch(error => {
        console.log('Error:', error);

      })


    setUpload(true);
  }




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

    (skills.skills.length === 0) ? alert("Please choose Technology!") :
      (skills.imageId === "" && !upload) ? alert("Please choose supporting document and" + toUnicodeVariant('CLICK UPLOAD!', 'bold sans', 'bold')) :

        userService.submitSkiilsToHR(skills)
          .then(response => {
            console.log(response.data)
            methods.reset()

            alert("Your skills submitted to HR!");
            setSkillsSubmitted(true);

            setApprovalPending(true)
            setShowSkills(false)
            setSkillsDenyed(false)


          })
          .catch(error => console.log(error))

    //sending skills values to App.js
    submitRequestToHR(skills)

    setIsSendDataToDB(false)


  }

  if (skillsSubmittd) {
    return <Navigate to={"/profile"} />
  }

  const updatePage = () => {
    setShowSkills(true)
    setApprovalPending(false)
    setSkillsDenyed(false)
  }


  return (
    <>
      <div className="skillpage">
        {approvalPending &&
          <div>
            <h3> You recently send your request to HR. Please wait for the approval!. </h3>
          </div>
        }


        {skillsDenyed &&
          <div className="skillsDenied">
            <h3> Your skills denyed by HR!</h3>
            <h3> Please submit another document. </h3>
            <h6> <span className="reSubmit">Would you like to submit it now?</span></h6>
            <button onClick={updatePage} className="yesButton">Yes</button>
            <button className="notNowButton">Not now</button>
          </div>
        }
        {showSkills &&
          <div>
            <div className="container">
              <div className="skillContainer">
                <h1 className="skillheading">
                  <strong> Skills</strong>
                </h1>

                <div className="show-skills">
                  <FormProvider {...methods}>
                    <form
                      onSubmit={e => e.preventDefault()}
                      noValidate
                      autoComplete="off"
                    >
                      <div className="row mb-4">
                        <div className="col-sm-4">
                          <h5 className="select-skillheading">
                            <strong> Select skills:</strong>
                          </h5>
                        </div>
                        <div className="col-sm-8">
                          <Input
                            {...skills_validation}
                            array={technologies}
                            skills={approvedSkills}
                          />
                        </div>

                      </div>



                      <div className="row mb-3">
                        <div className="col-sm-4">
                          <label htmlFor="img">
                            <h5 className="select-skillheading">
                              <strong> Supporting document: </strong>
                            </h5>
                          </label>
                        </div>
                        <div className="col-sm-8">
                          <input
                            type="file"
                            id="img"
                            title="File size should be less than 60KB"
                            onChange={onFileChange}
                            onClick={removeFailedMessage}
                            ref={fileInputRef}
                            defaultValue="" // Set an empty value to avoid "No file selected"

                          />
                        </div>

                      </div>

                      <div className="upload-Failure">

                        <div className="row mb-3">
                          <div className="col-sm-4"></div>



                          <div className="col-sm-8">
                            {imageExists &&

                              <div>
                                <span className="uploadFailure" > Filename already exists.Please choose some other name! </span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>


                      <div className="row mb-2">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                          {selectedFile && <span className="fileSuccess" > File attached successfully! </span>} </div>
                      </div>
                      {selectedFile &&
                        <div className="row mb-5">

                          <div className="col-sm-4"></div>
                          <div className="col-sm-2"> <button id="uploadButton" className="successful" onClick={onFileUpload}>Upload</button></div>
                          <div className="col-sm-2">
                            <button id="removeButton" className="successful" onClick={handleRemoveFile}>Remove</button>
                          </div>
                          {(skills.imageId != "" && upload) &&
                            <div className="col-sm-4">
                              <span className="fileSuccess" > File uploaded successfully! </span>
                            </div>}


                        </div>
                      }



                      <div className="empSkillSubmit">
                        <button
                          className="btn btn-primary"
                          onClick={onSubmit} >
                          <span>Submit</span>
                        </button>
                      </div>

                    </form>
                  </FormProvider>

                </div>
              </div>
            </div>
          </div>
        }
      </div >



    </>
  );
}




