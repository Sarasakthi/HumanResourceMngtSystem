import React, { useEffect, useId, useState } from "react";
import EmployeeDataService from "../services/employee.service";
//import Table from 'react-bootstrap/Table';
//import './custom.scss';

let d = new Date();
export default function SearchEmployee(props) {

    const [formData, setFormData] = useState({
        searchingtext: "",
        radiobutton: "",
        checkbox: false
    })

    const [employees, setEmployees] = useState([]);
    const [showEmployees, setShowEmployees] = useState(false);
    const id = useId;

    const fetchInfo = () => {
        if ((formData.searchingtext == "") && (formData.radiobutton !== 'all')) {
            alert("Please choose one of the option")
            setShowEmployees(false);
        }
        else if (formData.searchingtext != "") {
            EmployeeDataService.getSelectedEmployee(formData.searchingtext)
                .then(response => {
                    console.log("Response from search box", response)
                    setEmployees(response.data)
                    setShowEmployees(true);
                })
                .catch(error => console.log(error))

        }
        else {
            EmployeeDataService.getAllEmployees()
                .then(response => {
                    console.log("Response", response)
                    setEmployees(response.data)
                    setShowEmployees(true);
                })
                .catch(error => console.log(error))
        }

    }
    function handleSearchChange(event) {

        //formData.radiobutton = ""
        setFormData(() => {
            return {
                radiobutton: "",
                [event.target.name]: event.target.value
            }
        })

    }

    function handleRadioBttonChange(event) {
        setFormData(() => {
            return {
                [event.target.name]: event.target.value,
                radiobutton: formData.radiobutton === "all" ? "" : "all",
                searchingtext: ""
            }
        })

    }

    function uncheck() {

        document.getElementById("{id + 'radiobutton'}").checked = false
    }

    return (
        <>
            <div>
                <label htmlFor="{id + 'searchingtext'}" ></label>

                <input
                    type="text"
                    id={id + 'searchingtext'}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    onClick={uncheck}
                    name="searchingtext"
                    value={formData.searchingtext} />

                <div>
                    <label htmlFor="{id + 'radiobutton'}" >Find all employees</label>

                    <input type="radio"
                        name="radiobutton"
                        id="{id + 'radiobutton'}"
                        value='all'
                        checked={formData.radiobutton === "all"}
                        onClick={handleRadioBttonChange} />

                </div>

            </div>
            <div>
                <button onClick={fetchInfo}>Find</button>
            </div>
            <div>

                {showEmployees && <div>
                    <div>
                        <button>Update</button>
                        <button>Delete</button>
                    </div>
                    <div className="container">
                        <div className="col align-self-center">
                            <table className="table table-bordered">
                                <thead className="table thead-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>idEmployee</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>

                                    </tr>
                                </thead>
                                <tbody className=" table table-stripped  table-hover">
                                    {employees.map((myEmployeeList) =>
                                        <tr>
                                            <td>

                                                <input type="checkbox"
                                                    id={myEmployeeList.idEmployee}
                                                 /*   onChange = {(e) => setFormData((prevData) =>{
                                                        return {
                                                            ...prevData,
                                                            checkbox : e.target.checked
                                                        }
                                                    })}*/
                                                    name="checkbox"
                                                    checked={formData.checkbox} />
                                            </td>
                                            <td>
                                                <label htmlFor={myEmployeeList.idEmployee}>
                                                    {myEmployeeList.idEmployee}
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor={myEmployeeList.idEmployee}>
                                                    {myEmployeeList.firstname}
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor={myEmployeeList.idEmployee}>
                                                    {myEmployeeList.lastname}
                                                </label>
                                            </td>






                                        </tr>

                                    )}
                                </tbody>




                            </table>
                        </div>
                    </div>
                </div >
                }
            </div >


        </>
    )
}
