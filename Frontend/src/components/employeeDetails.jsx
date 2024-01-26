import React, { useId, useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import EmployeeDataService from "../services/employee.service";

const id = useId;
let d = new Date();

export default function EmployeeDetail(props) {
    const [showManagersDropDown, setManagersShowDropDown] = useState(false);
    const [showDepartmentDropDown, setShowDepartmentDropDown] = useState(false);
    const [managersList, setManagersList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([])

    const [employeeDetails, setEmployeeDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        dateofjoining: d,
        dateofbirth: d,
        department: "",
        position: "",
        reportingto: "",
        active: true
    });


    useEffect(() => {
        fetchInfo()

    }, []);
    console.log("MANAGERS LIST", managersList)
    console.log("DEPARTMENTS LIST", departmentsList)


    function getmanagersdatafromdb() {
        setManagersShowDropDown(true);
    }

    function getdepartmentsdatafromdb() {
        setShowDepartmentDropDown(true);

    }

    function handleChange(event) {
        setEmployeeDetails(prevData => {

            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    const fetchInfo = () => {
        EmployeeDataService.get("manager")
            .then(response => {
                console.log("Response", response)
                setManagersList(response.data)
            })
            .catch(error => console.error('data not loaded', error))
        EmployeeDataService.getAll()
            .then(response => {
                console.log("Response", response)
                setDepartmentsList(response.data)
            })
            .catch(error => console.error('data not loaded', error))
    }



    function submitData(e) {
        e.preventDefault();
        let inData = {
            firstname: employeeDetails.firstname,
            lastname: employeeDetails.lastname,
            email: employeeDetails.email,
            dateofjoining: employeeDetails.dateofjoining,
            dateofbirth: employeeDetails.dateofbirth,
            department: employeeDetails.department,
            position: employeeDetails.position,
            reportingto: employeeDetails.reportingto,
            active: employeeDetails.active
        };

        props.onSubmit(employeeDetails);
        /* Inserting data into database*/

        EmployeeDataService.create(inData)
            .then(response => console.log("ID:", response.data.idEmployee, "FIRSTNAME:", response.data.firstname, "ACTIVE:", response.data.active))
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
                        required
                    />
                </div>
                <div>
                    <label htmlFor={id + 'lastname'}>Lastname :</label>
                    <input id={id + 'lastname'}
                        type="text"
                        placeholder=" Enter Lastname"
                        name="lastname"
                        value={employeeDetails.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor={id + 'email'}>Email :</label>
                    <input id={id + 'email'}
                        type="email"
                        placeholder=" Enter Email"
                        name="email"
                        value={employeeDetails.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor={id + 'dateofjoining'}>Date of joining :</label>
                    <DatePicker
                        id={id + 'dateofjoining'}
                        type="Date"
                        dateFormat={"yyyy-MM-dd"}
                        selected={employeeDetails.dateofjoining}
                        onChange={(date) => setEmployeeDetails((prevData) => {
                            return {
                                ...prevData,
                                dateofjoining: date
                            }
                        })}
                        required
                    />

                </div>

                <div>
                    <label htmlFor={id + 'dateofbirth'}>Date of Birth :</label>
                    <DatePicker
                        id={id + 'dateofbirth'}
                        type="Date"
                        dateFormat={"yyyy-MM-dd"}
                        selected={employeeDetails.dateofbirth}
                        onChange={(date) => setEmployeeDetails((prevData) => {
                            return {
                                ...prevData,
                                dateofbirth: date
                            }
                        })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor={id + 'department'}>Department :</label>
                    <select id={id + 'department'}
                        value={employeeDetails.department}
                        name="department"
                        onClick={getdepartmentsdatafromdb}
                        onChange={handleChange}
                        required>
                        {showDepartmentDropDown === true ? (departmentsList.map((myDepartmentList) =>

                            <option value={`${myDepartmentList.departmentName}`}>
                                {myDepartmentList.departmentName}
                            </option>

                        )) : <option> --choose the department -- </option>
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor={id + 'position'}>Position :</label>
                    <input id={id + 'position'}
                        type="text"
                        placeholder=" Enter the position"
                        name="position"
                        value={employeeDetails.position}
                        onChange={handleChange}
                        required />
                </div>

                <div>
                    <label htmlFor={id + 'reportingto'}>Reporting To :</label>
                    <select id={id + 'reportingto'}
                        value={employeeDetails.reportingto}
                        name="reportingto"
                        onClick={getmanagersdatafromdb}
                        onChange={handleChange}
                        required
                    >
                        {showManagersDropDown === true ? (managersList.map((myManagerList) =>

                            <option value={`${myManagerList.firstname} - ${myManagerList.department}`}>
                                {myManagerList.firstname} - {myManagerList.department}
                            </option>

                        )) : <option> --choose the person reporting to --</option>
                        }

                    </select>
                </div>


                <button type="submit" onClick={submitData}>Submit</button>
            </form>
        </div>
    )
}