
import React, { useState } from 'react';
import './home.css';
import EmployeeDetails from './employeeDetails'
import SearchEmployee from './searchEmployee'

export default function Home() {
  const [isShowEmployeeDetails, setIsShowEmployeeDetails] = useState(false);
  const [isShowSerchDetails, setIsShowSerchDetails] = useState(false)

  function showEmployeeDetails() {
    setIsShowEmployeeDetails(true);
    setIsShowSerchDetails(false);
  }

  function showSearch(){
    setIsShowSerchDetails(true);
    setIsShowEmployeeDetails(false);
  }
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
        {isShowEmployeeDetails && <EmployeeDetails />}
        </div>
        <div>
        {isShowSerchDetails && <SearchEmployee />}
        </div>
         
      </div>
    </div>
  )
}