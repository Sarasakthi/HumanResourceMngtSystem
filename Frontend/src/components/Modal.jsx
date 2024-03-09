import React from 'react'
import { useId, useState, useEffect } from 'react'
import "./Modal.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';

let d = new Date();
export const Modal = ({ value, onSubmit, defaultValue, managers, departments }) => {
    console.log("value", value);
    console.log("reached modal");
    console.log("dafault value", defaultValue)

    const [updateEmployees, setUpdateEmployees] = useState(defaultValue || {
        idEmployee: "",
        firstname: "",
        lastname: "",
        email: "",
        dateofjoining: d,
        dateofbirth: d,
        department: "",
        position: "",
        reportingto: ""
    })

    const [errors, setErrors] = useState("")

    const [managersList, setManagersList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([])
    const [showManagersDropDown, setManagersShowDropDown] = useState(false);
    const [showDepartmentDropDown, setShowDepartmentDropDown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);




    // console.log("modal - 1 ", isModalOpen)
    useEffect(() => {
        setDepartmentsList(departments)
        setManagersList(managers)

        openModal();

        // Clean up the modal when the component is unmounted
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [])
    // console.log("modal - 2 ", isModalOpen)


    const openModal = () => {
        setIsModalOpen(true);
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove('modal-open');
    };
    let joiningDate = new Date(updateEmployees.dateofjoining)

    let birthDate = new Date(updateEmployees.dateofbirth)

    const id = useId;

    const handleChange = (e) => {
        setUpdateEmployees(
            {
                ...updateEmployees,
                [e.target.name]: e.target.value
            }
        )

    }
    const validateForm = () => {
        if (updateEmployees.idEmployee && updateEmployees.firstname && updateEmployees.lastname
            && updateEmployees.email && updateEmployees.dateofjoining && updateEmployees.dateofbirth
            && updateEmployees.department && updateEmployees.position && updateEmployees.reportingto) {
            setErrors("");
            return true;
        }

        else {
            let errorFields = [];
            for (const [key, value] of Object.entries(updateEmployees)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(","));
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Modal update employess values ", updateEmployees);
        if (!validateForm()) {
            return;
        }
        onSubmit(updateEmployees);
        //closeModal();
    }

    function getmanagersdatafromdb() {
        setManagersShowDropDown(true);
    }

    function getdepartmentsdatafromdb() {
        setShowDepartmentDropDown(true);

    }

    function handleModal() {
        //    setIsModalOpen(false);

    }
    // console.log("modal value in modal.jsx", isModalOpen)

    return (
        <>


            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <div className='modal-title'>
                        <h2>Update employee</h2>
                        </div>
                        <div className='modal-scrollable-content'>
                        <form>
                            <div className='fields'>
                           
                       
                    <div className='form-group'>
                        
                        <label htmlFor="{id + 'ID'}">ID
                        
                        
                            <input 
                                id="{id + 'ID'}"
                                name="idEmployee"
                                value={updateEmployees.idEmployee}
                                onChange={handleChange} readOnly disabled />
                                </label>
                                </div>
                             
                  

                  
                    <div className='form-group'>
                        <label  htmlFor="{id + 'FIRSTNAME'}">Firstname:
                       
                       
                            <input id="{id + 'FIRSTNAME'}"
                                name="firstname"
                                value={updateEmployees.firstname}
                                onChange={handleChange} readOnly disabled /></label>
                        </div>
                        

                   


                  
                    <div className='form-group'>
                        <label htmlFor="{id + 'LASTNAME'}">Lastname:
                      
                       
                            <input id="{id + 'LASTNAME'}"
                                name="lastname"
                                value={updateEmployees.lastname}
                                onChange={handleChange} readOnly disabled /></label>
                       
                      
                    </div>


                   
                    <div className='form-group'>
                        <label  htmlFor="{id + 'email'}">Email:
                      
                       
                            <input id="{id + 'email'}"
                                name="email"
                                value={updateEmployees.email}
                                onChange={handleChange} readOnly disabled /></label>
                        
                       
                    </div>


                  
                    <div className='form-group'>
                        <label htmlFor={id + 'dateofjoining'}>Date of joining :
                       
                       
                            <DatePicker
                                placeholderText="Date of joining"
                                id={id + 'dateofjoining'}
                                type="Date"
                                dateFormat={"yyyy-MMM-dd"}
                                selected={joiningDate}
                                onChange={(date) => setUpdateEmployees((prevData) => {
                                    return {
                                        ...prevData,
                                        dateofjoining: date
                                    }
                                })}
                                readOnly disabled
                            /> </label>
                       
                       
                    </div>


                   
                    <div className='form-group'>
                        <label htmlFor={id + 'dateofbirth'}>Date of Birth :
                        
                            <DatePicker
                                placeholderText="Date of birth"
                                id={id + 'dateofbirth'}
                                type="Date"
                                dateFormat={"yyyy-MM-dd"}
                                selected={birthDate}
                                onChange={(date) => setUpdateEmployees((prevData) => {
                                    return {
                                        ...prevData,
                                        dateofjoining: date
                                    }
                                })}
                                readOnly disabled
                            /></label>
                       
                    </div>


                   
                    <div className='form-group'>
                        <label  htmlFor={id + 'department'}>Department:
                       
                            <select id={id + 'department'}
                                value={updateEmployees.department}
                                name="department"
                                onClick={getdepartmentsdatafromdb}
                                onChange={handleChange}
                                required>
                                {showDepartmentDropDown === true ? (departmentsList.map((myDepartmentList) =>

                                    <option value={`${myDepartmentList.departmentName}`}>
                                        {myDepartmentList.departmentName}
                                    </option>

                                )) : <option> {updateEmployees.department}</option>
                                }
                            </select></label>
                        
                    </div>


                   
                    <div className='form-group'>
                        <label htmlFor={id + 'position'}>Position:
                       
                       
                            <input id={id + 'position'}
                                type="text"
                                placeholder=" Enter the position"
                                name="position"
                                value={updateEmployees.position}
                                onChange={handleChange}
                                required /></label>
                       
                    </div>


                    
                    <div className='form-group'>
                        <label  htmlFor={id + 'reportingto'}>Reporting To:
                       
                            <select id={id + 'reportingto'}
                                value={updateEmployees.reportingto}
                                name="reportingto"
                                onClick={getmanagersdatafromdb}
                                onChange={handleChange}
                                required
                            >
                                {showManagersDropDown === true ? (managersList.map((myManagerList) =>

                                    <option value={`${myManagerList.firstname} - ${myManagerList.department}`}>
                                        {myManagerList.firstname} - {myManagerList.department}
                                    </option>

                                )) : <option> {updateEmployees.reportingto}</option>
                                }

                            </select></label>
                        
                    </div>


                    {errors && <div className="error">
                        {`Please include: ${errors}`}
                    </div>
                    }
                    <button type="submit" className="btn btn-primary"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                    </div>
                </form>
                </div>
                    </div>
                </div>
            )
            }
        </>
    )
}




















// showIcon
//toggleCalendarOnIconClick
//closeOnScroll={true}