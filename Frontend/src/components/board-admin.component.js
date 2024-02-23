
import * as React from 'react'
import { useState, useEffect } from 'react';
import './home.css';
import { EmployeeDetails } from "./EmployeeDetails"
import SearchEmployee from './searchEmployee'
import EmployeeDataService from "../services/employee.service";
import "bootstrap/dist/css/bootstrap.min.css";
import userService from '../services/user.service';
import {HRApproval} from "./HRApproval"


let d = new Date();
let data;
export const BoardAdmin = ({ pendingApproval }) => {
  console.log("Pending approval in adminBoard", pendingApproval.idEmployee)

  const [isShowEmployeeDetails, setIsShowEmployeeDetails] = useState(false);
  const [isShowSerchDetails, setIsShowSerchDetails] = useState(false);
  const [isShowHRApproval,setIsShowHRApproval] = useState(false);
  const [managersList, setManagersList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([])
 

  
  function showEmployeeDetails() {
    setIsShowEmployeeDetails(true);
    setIsShowSerchDetails(false);
    setIsShowHRApproval(false);
  }

  function showSearch() {
    setIsShowSerchDetails(true);
    setIsShowEmployeeDetails(false);
    setIsShowHRApproval(false);
  }

  function showHRApproval(){
    setIsShowHRApproval(true);
    setIsShowSerchDetails(false);
    setIsShowEmployeeDetails(false);
  }

  //getting data from employee details - child component
  const getData = (data) => {
    console.log("Displaying from home page - Add employee", data);

  }


  const fetchInfo = () => {
    userService.getAdminBoard("manager")
      .then(response => {
        console.log("Response - managers", response)
        setManagersList(response.data)
      })
      .catch(error => console.error('data not loaded', error))
    userService.getAllDepartments()
      .then(response => {
        console.log("Response - departments", response)
        setDepartmentsList(response.data)
      })
      .catch(error => console.error('data not loaded', error))
  }


  useEffect(() => {
    fetchInfo()
   /* setSkills(() => ({
      idEmployee: pendingApproval.idEmployee,
      skills: pendingApproval.skills
    }))*/
  }, []);

 // console.log("idEmployee in ADMIN", skills)
// console.log("skills in ADMIN", skills.skills)
  return (
    <div className="App">
      <h1>Human Resource Management System</h1>

      <div>
        <a href='\'>Home</a>
      </div>

      <div>
        <button onClick={showSearch}>Search Employee</button>

        <button onClick={showEmployeeDetails}>Add Employee</button>
        <button onClick = {showHRApproval}>HR Approval</button>
        <div>
          {isShowEmployeeDetails &&
            <EmployeeDetails
              managers={managersList}
              departments={departmentsList}
              receiveEmployeeDetails={getData}
            />}
        </div>
        <div>
          {isShowSerchDetails &&
            <SearchEmployee
              managers={managersList}
              departments={departmentsList} />}
        </div>
        <div>
          {isShowHRApproval &&
          <HRApproval 
          />

          }
        </div>

      </div>
    </div>
  )
}