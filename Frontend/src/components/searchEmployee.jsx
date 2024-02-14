import React, { useEffect, useId, useState } from "react";
import EmployeeDataService from "../services/employee.service";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"

import { searchEmployee } from "./searchEmployee.css"
import { Modal } from "./Modal";
import userService from "../services/user.service";

let d = new Date();
export default function SearchEmployee(props) {

    const [managersList, setManagersList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([]);

    const [formData, setFormData] = useState({
        searchingtext: "",
        radiobutton: "",
        checkbox: false
    });

    const [employees, setEmployees] = useState([]);
    const [showEmployees, setShowEmployees] = useState(false);
    const id = useId;
    const [value, setValue] = useState([]);
    const [updateEmployees, setUpdteEmployees] = useState([]);
    const [showUpdateEmployees, setShowUpdateEmployees] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [rowToEdit, setRowToEdit] = useState(null);

    useEffect(() => {
        setDepartmentsList(props.departments)
        setManagersList(props.managers)
    }, [])




    //console.log("joining Date : ", joiningDate)
    //let joinDate = joiningDate.toLocaleDateString();
    //console.log("joining date new format", joinDate)

    const fetchInfo = () => {

        if ((formData.searchingtext == "") && (formData.radiobutton !== 'all')) {
            alert("Please choose one of the option")
            setShowEmployees(false);
        }

        else if (formData.searchingtext != "") {
            userService.getSelectedEmployee(formData.searchingtext)
                .then(response => {
                    console.log("Response from search box", response)
                    setEmployees(response.data)
                    setShowEmployees(true);
                })
                .catch(error => console.log(error))

        }

        else {
            userService.getAllEmployees()
                .then(response => {
                    console.log("Response get all employees", response)
                    setEmployees(response.data)
                    setShowEmployees(true);
                })
                .catch(error => console.log(error))
        }

    }



    function handleOnChange(event) {
        const { value, checked } = event.target
        if (checked == true) {
            setValue(prev => [...prev, value])
        }
        else {

            setValue(prev => {
                return [...prev.filter(data => data != value)]
            })

        }
    }


    /*  function handleUpdate() {
          EmployeeDataService.getSelectedEmployeeArray(value)
              .then(response => {
                  console.log("Response get selected  idemployees array to update ", response.data)
                  setUpdteEmployees(response.data)
                  setShowEmployees(false)
                  setShowUpdateEmployees(true);
              })
              .catch(error => console.log(error))
      }
      console.log("update Employees Array", updateEmployees)*/

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

    /*  function handleEmployeeUpdate(event) {
          setEmployees(prevData => {
              return {
                  ...prevData,
                  [event.target.name]: event.target.value
              }
          })
      }
      console.log("Update employees before submitting", employees)*/

    const handleDeleteRows = (targetIndex) => {
        console.log("delete selected employee", employees[targetIndex].idEmployee)

        userService.delete(employees[targetIndex].idEmployee)
            .then(response => {
                console.log("deleted employee",response)
                setEmployees(employees.filter((_, idx) => idx !== targetIndex))
            })
            // .then(setEmployees(employees.filter((_, idx) => idx !== targetIndex)))  // we are not focussing about the data of the array, just need only the index
           .catch(error => console.log("Error while deleting", error))                                    // so we are using _ here
    };

    const handleModal = (index) => {
        setRowToEdit(index);
        setModalOpen(true);
    }

    const handleUpdate = (newRecord) => {
        console.log("New Record", newRecord);
        console.log("idEmployee", employees[rowToEdit].idEmployee)

        userService.update(employees[rowToEdit].idEmployee, newRecord)
            .then(
                setEmployees(employees.map((updatedEmployeeList, index) => {
                    if (index !== rowToEdit) {
                        return updatedEmployeeList;
                    }
                    else {
                        return newRecord;
                    }
                }))
            )
            .catch(error => console.log(error))
        /*rowToEdit === null
        setEmployees([...employees,
                        newRecord])*/


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
            {showEmployees &&
                <div className="table-wrapper">



                    <div className="container">
                        <div className="col align-self-center">
                            <table className="table table-bordered">
                                <thead className="table thead-dark">
                                    <tr>

                                        <th>idEmployee</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Date of joining</th>
                                        <th>Date of birth</th>
                                        <th>Department</th>
                                        <th>Position</th>
                                        <th>Reporting to</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody className=" table table-stripped  table-hover">
                                    {employees.map((myEmployeeList, index) =>
                                        <tr key={index}>

                                            <td>

                                                {myEmployeeList.idEmployee}

                                            </td>
                                            <td>

                                                {myEmployeeList.firstname}

                                            </td>
                                            <td>

                                                {myEmployeeList.lastname}

                                            </td>
                                            <td>

                                                {myEmployeeList.email}

                                            </td>
                                            <td>

                                                {new Date(myEmployeeList.dateofjoining).toLocaleDateString()}

                                            </td>
                                            <td>

                                                {new Date(myEmployeeList.dateofbirth).toLocaleDateString()}

                                            </td>
                                            <td>

                                                {myEmployeeList.department}

                                            </td>
                                            <td>

                                                {myEmployeeList.position}

                                            </td>
                                            <td>

                                                {myEmployeeList.reportingto}

                                            </td>



                                            <td>
                                                <span className="actions">
                                                    <BsFillTrashFill className="delete-btn"
                                                        onClick={() => handleDeleteRows(index)} />

                                                    <BsFillPencilFill className="edit-btn"
                                                        onClick={() => handleModal(index)}
                                                    />
                                                </span>
                                            </td>

                                        </tr>

                                    )
                                    }
                                </tbody>




                            </table>
                        </div>
                    </div>
                </div >
            }

            {modalOpen &&
                <Modal
                    defaultValue={rowToEdit !== null && employees[rowToEdit]}
                    closeModal={() => {
                        setModalOpen(false)
                        setRowToEdit(null)
                    }}
                    onSubmit={handleUpdate}
                    managers={managersList}
                    departments={departmentsList}

                />}


        </>
    )
}
