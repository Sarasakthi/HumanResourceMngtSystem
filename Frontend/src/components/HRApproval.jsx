import React, { useEffect, useState } from 'react'
import userService from '../services/user.service';
//import { Link } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Document } from './document';

export const HRApproval = () => {

  const [state, setState] = useState([])
  const [empSkills, setEmpSkills] = useState(false)

  useEffect(() => {
    userService.skillsFromDBForHRApproval()
      .then(response => {
        console.log("all employee details from db", response)
        setState(response.data.filter(gettingValues))

      })
      .catch(error => console.log(error))

  }, [])


  function gettingValues(item) {
    return (item.skills.length != 0)
  }
  console.log("state from hrapproval", state)

  function onButtonClick(index) {
    console.log("Finding corrct index",state[index].idEmployee)
    console.log("Finding corrct index",state[index].imageName)
    userService.verifyingEmpSkills(state[index].imageName)
      .then((response) => {
        console.log("response from DB",response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a')
        link.href = url;
       link.setAttribute('download',`${state[index].imageName}`);  //name of the file after downloaded in local system
       
        document.body.appendChild(link);
        link.click();
       //setEmpSkills(true);
        })
      .catch(error => console.log(error))
  }
  function acceptAlert(){
    alert("Skills accepted!")
  }
  function denyAlert(){
    alert("Skills denyed!")
  }
  return (

    <>
      <div className="table-wrapper">



        <div className="container">
          <div className="col align-self-center">
            <table className="table table-bordered">
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

                    <td>{myEmployeeList.skills}</td>

                    <td onClick={() => onButtonClick(index)}>
                     <Link to = "">
                        {myEmployeeList.imageName}
                        </Link>
                    </td>

                    <td>
<Link to = "/admin" onClick = {acceptAlert}>Accept</Link>

<Link to ="/admin" onClick = {denyAlert}>Deny</Link>
                    </td>



                  </tr>

                )
                }
              </tbody>




            </table>
          </div>
        </div></div>
      <div>
        <Routes>
          <Route path="/download" element={<Document
          />} />
        </Routes>
      </div>
    </>
  )
}
