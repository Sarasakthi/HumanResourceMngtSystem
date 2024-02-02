
import * as React from 'react'
import { useState } from 'react';
import './home.css';
import {EmployeeDetails} from "./EmployeeDetails"
import SearchEmployee from './searchEmployee'


let d = new Date();
let data;
export default function Home() {
  const [isShowEmployeeDetails, setIsShowEmployeeDetails] = useState(false);
  const [isShowSerchDetails, setIsShowSerchDetails] = useState(false);


  function showEmployeeDetails() {
    setIsShowEmployeeDetails(true);
    setIsShowSerchDetails(false);
  }

  function showSearch() {
    setIsShowSerchDetails(true);
    setIsShowEmployeeDetails(false);
  }

  //getting data from employee details - child component
  const  getData = (data) => {
    console.log("Displaying from home page", data);
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
          {isShowEmployeeDetails &&
            <EmployeeDetails
              onSubmit={getData}
            />}
        </div>
        <div>
          {isShowSerchDetails &&
            <SearchEmployee
              details={data} />}
        </div>

      </div>
    </div>
  )
}