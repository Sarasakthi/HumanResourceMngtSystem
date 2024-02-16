
import * as React from 'react'
import { useState, useEffect } from 'react';
import './home.css';
import { EmployeeDetails } from "./EmployeeDetails"
import SearchEmployee from './searchEmployee'
import EmployeeDataService from "../services/employee.service";
import "bootstrap/dist/css/bootstrap.min.css";
import userService from '../services/user.service';



let d = new Date();
let data;
export default function Home() {
  const [isShowEmployeeDetails, setIsShowEmployeeDetails] = useState(false);
  const [isShowSerchDetails, setIsShowSerchDetails] = useState(false);
  const [managersList, setManagersList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([])


  function showEmployeeDetails() {
    setIsShowEmployeeDetails(true);
    setIsShowSerchDetails(false);
  }

  function showSearch() {
    setIsShowSerchDetails(true);
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

  }, []);
  return (
    <div className="App">
      <h1>Human Resource Management System</h1>

      <div>
        <a href='\'>Home</a>
      </div>

      <div>
        <button onClick={showSearch}>Search Employee</button>

        <button onClick={showEmployeeDetails}>Add Employee</button>
        <button>HR Approval</button>
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
        
      </div>
    </div>
  )
}