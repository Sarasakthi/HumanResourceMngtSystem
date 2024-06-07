import React from 'react'
import { useId, useState, useEffect } from 'react'
import EmployeeDataService from "../services/employee.service";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"


import { searchEmployee } from "./searchEmployee.css"


import userService from "../services/user.service";
import { createPortal } from "react-dom";
import { Modal } from './Modal';

let d = new Date();
export const SearchEmployee = ({managers,departments,setDisplay,resetDisplay}) => {

    const [managersList, setManagersList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([]);

    const [formData, setFormData] = useState({
        searchingtext: "",
        radiobutton: "",
        checkbox: false
    });

    const [employees, setEmployees] = useState([]);
    //const [showEmployees, setShowEmployees] = useState(false);
    const id = useId;
    const [value, setValue] = useState([]);
    const [updateEmployees, setUpdteEmployees] = useState([]);
    const [showUpdateEmployees, setShowUpdateEmployees] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [rowToEdit, setRowToEdit] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [noEmployeeMessage, setNoEmployeeMessage] = useState(false)

    useEffect(() => {
        setDepartmentsList(departments)
        setManagersList(managers)
        //handleDeleteRows()
        //document.body.style.overflow = 'visible'
    }, [employees, deleteModalOpen, modalOpen])





    //console.log("joining Date : ", joiningDate)
    //let joinDate = joiningDate.toLocaleDateString();
    //console.log("joining date new format", joinDate)

    const fetchInfo = () => {

        if ((formData.searchingtext == "") && (formData.radiobutton !== 'all')) {
            alert("Please choose one of the option")
            //setShowEmployees(false);
        }

        else if (formData.searchingtext != "") {
            userService.getSelectedEmployee(formData.searchingtext)
                .then(response => {
                    console.log("Response from search box at FetchInfo", response)

                    console.log("response length before: ", response.data.length)
                    if (response.data.length == 0) {
                        setNoEmployeeMessage(true);
                        setShowResult(false);
                    }
                    //setShowEmployees(true);

                    else {
                        setShowResult(true);
                        setNoEmployeeMessage(false);
                        setEmployees(response.data)
                    }
                    console.log("response length: ", response.data.length)

                })
                .catch(error => console.log(error))
        }

        else {
            userService.getAllEmployees()
                .then(response => {
                    console.log("Response get all employees", response)
                    setEmployees(response.data)
                    setNoEmployeeMessage(false);
                    setShowResult(true);
                })
                .catch(error => console.log(error))
        }

    }
    console.log("message", noEmployeeMessage)
    console.log("printing employees",employees);

  //function to unchek the checked box
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
                //radiobutton: formData.radiobutton === "all" ? "" : "all",
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
        console.log("delete selected employee", targetIndex)

        userService.deleteEmployee(targetIndex)
            .then(response => {
                console.log("deleted employee", response.data)
                //setEmployees(employees.filter((_, idEmployee) => idEmployee != targetIndex))// we are not focussing about the data of the array, just need only the index so we are using _ here
                setEmployees(employees.filter( emp => emp.idEmployee != targetIndex));

            })
            .catch(error => console.log("Error while deleting", error))                                    
    }


    const openModal = (index) => {
        console.log("reached update method")
        setRowToEdit(index);
        setDeleteModalOpen(false);
        setModalOpen(true);
        setDisplay();
        //document.body.style.overflow = 'hidden'
       // document.getElementById("background").style.display = 'none'
        
        console.log("finished rowToEdit and  modalOpen")

    }


    const closeModal = () => {
        setModalOpen(false);
        resetDisplay();
        //document.body.style.overflow = 'visible'
        //document.getElementById("background").style.display = "block"
    }

    const openDeleteModal = (index) => {
        setRowToEdit(index);
        setModalOpen(false);
        setDeleteModalOpen(true);
        setDisplay();
       // document.body.style.overflow = 'hidden'
       //document.getElementById("background").style.display = 'none'
    }
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        resetDisplay();
        //document.body.style.overflow = 'visible'
        //document.getElementById("background").style.display = "block"
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

    }



    return (
        <>
        <div id ="background" className={(modalOpen || deleteModalOpen) ?'search-inactive' : "" }>
            <div className="search">
                <div className="searchrow">
                    {/*  <label className="" htmlFor="{id + 'searchingtext'}" ></label>*/}
                    {/*   <div className="">*/}
                    <input className=""
                        type="text"
                        id={id + 'searchingtext'}
                        placeholder="Search"
                        onChange={handleSearchChange}
                        onClick={uncheck}
                        name="searchingtext"
                        value={formData.searchingtext}
                        autoFocus />
                    {/* </div>*/}
                </div>
                <div className="radioandbutton">
                    <div className="radiobtn">


                        <input

                            type="radio"
                            name="radiobutton"
                            id="{id + 'radiobutton'}"
                            value='all'
                            checked={formData.radiobutton === "all"}
                            onClick={handleRadioBttonChange} />
                        <label htmlFor="{id + 'radiobutton'}" className="form-check-label">Find all employees</label>

                    </div>


                    <div className="findbutton">
                        <button className="btn btn-primary" onClick={fetchInfo}>Find</button>
                    </div>
                </div>
            </div>

            {noEmployeeMessage &&
                <div className="employeeResult">
                    <h3 className='search-no-employee'>No employees found!</h3>
                </div>
            }

            {showResult &&
                <div className="employeetable">
                    {/*    {showEmployees &&*/}

                    <div>
                     {/*   <div className="table-wrapper">*/}



                            <div className="container">
                                <div className="row">
                                    <div className='col'>
                                    <div class="table-responsive table-head-fixed">
                                    <table className="table table-stripped  table-hover table-bordered">
                                        <thead className="thead-dark">
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
                                        <tbody className=''>

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
                                                                onClick={() => openDeleteModal(index)} />

                                                            <BsFillPencilFill className="edit-btn"
                                                                onClick={() => openModal(index)}
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
                                </div>
                            </div>
                     {/*   </div >*/}
                    </div>



                    {/*   }*/}
                </div>
            }
 </div>
            {modalOpen &&
                <Modal
               
                    isOpen={modalOpen}
                    onClose={closeModal}
                    defaultValue={rowToEdit !== null && employees[rowToEdit]}

                    onSubmit={handleUpdate}
                    managers={managersList}
                    departments={departmentsList}


                />
            }

            {deleteModalOpen &&

                <Modal
                    isDeleteOpen={deleteModalOpen}
                    onClose={closeDeleteModal}
                    onSubmit={handleDeleteRows}
                    defaultValue={rowToEdit !== null && employees[rowToEdit]}
                />



            }
           
        </>
    )
}
