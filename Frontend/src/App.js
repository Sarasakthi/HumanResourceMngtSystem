
import React, { useState } from 'react';
import './App.css';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  const [isshowEmployeeDetails, setIsshowEmployeeDetails] = useState(false);

  function showEmployeeDetails() {
    setIsshowEmployeeDetails(true);
  }

  return (
    <div className="App">
      <h1>Human Resource Management System</h1>
      <div>
        <button>Search Employee</button>
        <button onClick={showEmployeeDetails}> Add Employee </button>
        <button>HR approval</button>
        {isshowEmployeeDetails && <EmployeeDetails />}
      </div>
    </div>
  );
}

export default App;
