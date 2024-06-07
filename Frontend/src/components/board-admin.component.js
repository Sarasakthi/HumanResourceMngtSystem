
import * as React from 'react'
import { useState, useEffect } from 'react';
import './home.css';
import { EmployeeDetails } from "./EmployeeDetails"
import {SearchEmployee} from './searchEmployee'
import EmployeeDataService from "../services/employee.service";
import "bootstrap/dist/css/bootstrap.min.css";
import userService from '../services/user.service';
import { HRApproval } from "./HRApproval"
import "./board-admin.component.css"


let d = new Date();
let data;
export const BoardAdmin = ({ pendingApproval }) => {
  console.log("Pending approval in adminBoard", pendingApproval.idEmployee)

  const [isShowEmployeeDetails, setIsShowEmployeeDetails] = useState(false);
  const [isShowSerchDetails, setIsShowSerchDetails] = useState(false);
  const [isShowHRApproval, setIsShowHRApproval] = useState(false);
  const [managersList, setManagersList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([])
  // const[skillsEmployeeList,setSkillsEmployeeList] = useState([]);
  const [state, setState] = useState([])
  const [isClassname, setIsClassname] = useState(false);


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

  function showHRApproval() {
    setIsShowHRApproval(true);
    setIsShowSerchDetails(false);
    setIsShowEmployeeDetails(false);
  }

  //getting data from employee details - child component
  const getData = (data) => {
    console.log("Displaying from home page - Add employee", data);

  }


  const fetchInfo = () => {
   /* userService.getAdminBoard("manager")
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
    userService.approvalPending()
      .then(response => {
        console.log("all employee details from db", response)
        setState(response.data.filter(gettingValues))

      })
      .catch(error => console.log(error))*/

  }
  
  useEffect(() => {
   // fetchInfo()
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
   

    
  }, []);

  // console.log("idEmployee in ADMIN", skills)
  // console.log("skills in ADMIN", skills.skills)
  function settingClass() {
    setIsClassname(true);
  }

  function resettingClass() {
    setIsClassname(false);
  }
  return (
    <>
      <div className={isClassname ? "boardAdmin-inactive" : ""}>
        <div className='head'>
          {/*  <div className="d-flex justify-content-center align-items-center">*/}

          <div className='header'>
            <h1><span className="hrms">Human Resource Management System</span></h1>
          </div>
          {/* </div>*/}

        </div>
        <div className='buttons-fixed'>
          <div className='buttons'>
            <div className='searchButton'><button onClick={showSearch}><span style={{ fontWeight: 'bold' }}>Search Employee</span></button></div>
            <div className='addEmployeeButton'><button onClick={showEmployeeDetails}><span style={{ fontWeight: 'bold' }}>Add Employee</span></button></div>
            <div className='HRApprovalbutton'><button onClick={showHRApproval}><span style={{ fontWeight: 'bold' }}>HR Approval</span></button></div>
          </div>
        </div>
      </div>
      <div className='content'>
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
              departments={departmentsList}
              setDisplay={settingClass}
              resetDisplay={resettingClass} />}
        </div>
        <div>
          {isShowHRApproval &&
            <HRApproval />

          }
        </div>
      </div>


    </>
  )
}