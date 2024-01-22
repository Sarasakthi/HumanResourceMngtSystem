import React, { useId, useState } from 'react'
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


import EmployeeDataService from "../services/employee.service";

const id = useId;
const querystring = require('querystring');

export default function EmployeeDetail() {
    let d = new Date();
    const [employeeDetails, setEmployeeDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        dateofjoining: d
    });

    function handleChange(event) {

        setEmployeeDetails(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
        console.log("Input : ", employeeDetails.firstname)
    }

    function changeDate(date) {
        setEmployeeDetails((prevData) => {
            return {
                ...prevData,
                dateofjoining: date
            }
        })

    }
    //let choosenDate = employeeDetails.dateofjoining

    function submitData() {
        
        let inData = {
            firstname: employeeDetails.firstname,
            lastname: employeeDetails.lastname,
            email: employeeDetails.email,
            dateofjoining: employeeDetails.dateofjoining
        };

        /* Inserting data into database*/

        EmployeeDataService.create(inData)
            .then(response => console.log("ID:", response.data.idEmployee, "FIRSTNAME:", response.data.firstname))
            .catch(error => console.log(error));
        alert("completed")
        console.log("Completed")

    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor={id + 'firstname'}>Firstname :</label>
                    <input id={id + 'firstname'}
                        type="text"
                        placeholder=" Enter Firstname"
                        name="firstname"
                        value={employeeDetails.firstname}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor={id + 'lastname'}>Lastname :</label>
                    <input id={id + 'lastname'}
                        type="text"
                        placeholder=" Enter Lastname"
                        name="lastname"
                        value={employeeDetails.lastname}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor={id + 'email'}>Email :</label>
                    <input id={id + 'email'}
                        type="email"
                        placeholder=" Enter Email"
                        name="email"
                        value={employeeDetails.email}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor={id + 'dateofjoining'}>Date of joining :</label>
                    <DatePicker
                        id={id + 'dateofjoining'}
                        dateFormat={"yyyy-MM-dd"}
                        name="dateofjoining"
                        value={employeeDetails.dateofjoining}
                        selected={employeeDetails.dateofjoining}
                        onChange={changeDate}
                    />

                </div>
                <button onClick={submitData}>submit</button>
            </form>
        </div>
    )
}