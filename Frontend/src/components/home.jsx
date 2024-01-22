
import React, { useState } from 'react';
import './home.css';
import EmployeeDetails from './employeeDetails'

export default function Home() {
  const [isShowEmployeeDetails, setIsShowEmployeeDetails] = useState(false);

  function showEmployeeDetails() {
    setIsShowEmployeeDetails(true);
  }

  return (
    <div className="App">
      <h1>Human Resource Management System</h1>
      
      <div>
        <a href='\'>Home</a>
      </div>

      <div>  
        <button>Search Employee</button>
        <button onClick={showEmployeeDetails}>Add Employee</button>
        <button>HR Approval</button>
        {isShowEmployeeDetails && <EmployeeDetails />}
      </div>
    </div>
  );
}