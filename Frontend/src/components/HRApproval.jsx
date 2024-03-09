import React, { useEffect, useState } from 'react'
import userService from '../services/user.service';
//import { Link } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Document } from './document';
import "./HRApproval.css";
export const HRApproval = (skillsEmployee) => {
  console.log("skillsEmployee", skillsEmployee);
  console.log("skillsEmployee.skillsEmployee", skillsEmployee.skillsEmployee)

  const [state, setState] = useState(skillsEmployee.skillsEmployee)
  const [findImageNames, setFindImageNames] = useState(true);
  const [empSkills, setEmpSkills] = useState(false)
  const [imageId, setImageId] = useState([])
  const [images, setImages] = useState([])
  const [showEmployees, setShowEmployees] = useState(true);
  console.log("Printing state", state)
  useEffect(() => {

    show()
  }, [state])


  if (state.length > 0 && (empSkills == false)) {

    (state.length > 0) ? setShowEmployees(true) : setShowEmployees(false)
    { state.map((item) => imageId.push(item.imageId)) }
    setEmpSkills(true);
  }


  console.log("Image Id Array", imageId)
  if (state.length > 0 && findImageNames == true) {
    userService.gettingImageNames(imageId)
      .then(response => {
        console.log(response)
        setImages(response.data)
      })
      .catch(error => console.log(error))
    setFindImageNames(false)
  }
  console.log("Final image table from DB", images)



  function onButtonClick(index) {
    console.log("Finding corrct index", images[index].id)
    console.log("Finding corrct imageName", images[index].name)
    userService.verifyingEmpSkills(images[index].name)
      .then((response) => {
        console.log("response from DB", response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a')
        link.href = url;
        link.setAttribute('download', `${images[index].name}`);  //name of the file after downloaded in local system

        document.body.appendChild(link);
        link.click();
        //setEmpSkills(true);
      })
      .catch(error => console.log(error))
  }
  function acceptAlert(targetIndex) {

    console.log("idEmployee for approval", state[targetIndex].idEmployee)

    userService.approveDocAndSkills(state[targetIndex].idEmployee)
      .then(response => {
        console.log("Returning user after approval - now the user have permanent skills", response.data)

        setState(state.filter((_, idx) => idx != targetIndex))

      }
      )
      .catch(error => console.log(error.request))
    alert("Skills accepted!")


  }
  function denyAlert(targetIndex) {
    console.log("idEmployee for deny", state[targetIndex].idEmployee)
    userService.denyDocAndSkills(state[targetIndex].idEmployee)
      .then(response => {
        console.log("Returning user after denyed skills", response.data)

        setState(state.filter((_, idx) => idx != targetIndex))

      }
      )
      .catch(error => console.log(error.request))
    alert("Skills denyed!")
  }
  function show() {
    (state.length == 0) ? setShowEmployees(false) : setShowEmployees(true);
  }
  return (

    <>
    <div className='skill-emp'>
      {showEmployees ?
        <div>
          <div className="table-wrapper">



            <div className="container">
              <div className="col align-self-center">
                <table className="table ">
                  <thead className="table thead-dark">
                    <tr>

                      <th>idEmployee</th>
                      <th>Firstname</th>
                      <th>Lastname</th>

                      <th>Document</th>
                      <th>Actions</th>


                    </tr>
                  </thead>
                  <tbody className=" table table-stripped  table-hover">


                    {state.map((myEmployeeList, index) =>

                      <tr key={index}>

                        <td>

                          {myEmployeeList.idEmployee}

                        </td>
                        <td>

                          {myEmployeeList.firstname}

                        </td>
                        <td>

                          {myEmployeeList.lastname}

                        </td>



                        <td onClick={() => onButtonClick(index)}>

                          <Link to="">
                            download
                          </Link>
                        </td>

                        <td>
                        <span className="actions">
                          <Link to="/admin"  className = "accept-link" onClick={() => acceptAlert(index)}>Accept</Link>

                          <Link to="/admin" className = "deny-link" onClick={() => denyAlert(index)}>Deny</Link>
                          </span>
                        </td>

                      </tr>


                    )}

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <Routes>
              <Route path="/download" element={<Document
              />} />
            </Routes>
          </div>
        </div>
        :
        <div className='message'>
          <h3><span className='noemployee'>No employee submitted skills for approval!</span></h3>
        </div>

      }
      </div>
    </>
  )
}
