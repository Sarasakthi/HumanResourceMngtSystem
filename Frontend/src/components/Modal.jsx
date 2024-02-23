import React from 'react'
import { useId, useState, useEffect } from 'react'
import "./Modal.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';

let d = new Date();
export const Modal = ({ closeModal, onSubmit, defaultValue, managers, departments }) => {

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

    useEffect(() => {
        setDepartmentsList(departments)
        setManagersList(managers)
    }, [])

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
        closeModal();
    }

    function getmanagersdatafromdb() {
        setManagersShowDropDown(true);
    }

    function getdepartmentsdatafromdb() {
        setShowDepartmentDropDown(true);

    }

    return (
       
            <div
                className="modal-container"
                onClick={(e) => {
                    if (e.target.className === "modal-container") {closeModal()};
                }}
            >
                <div className="modal-body">
                    <form>
                        <div className='form-group'>
                            <label htmlFor="{id + 'ID'}">ID</label>
                            <input id="{id + 'ID'}"
                                name="idEmployee"
                                value={updateEmployees.idEmployee}
                                onChange={handleChange} readOnly disabled />

                        </div>

                        <div className='form-group'>
                            <label htmlFor="{id + 'FIRSTNAME'}">Firstname</label>
                            <input id="{id + 'FIRSTNAME'}"
                                name="firstname"
                                value={updateEmployees.firstname}
                                onChange={handleChange} readOnly disabled />

                        </div>

                        <div className='form-group'>
                            <label htmlFor="{id + 'LASTNAME'}">Lastname</label>
                            <input id="{id + 'LASTNAME'}"
                                name="lastname"
                                value={updateEmployees.lastname}
                                onChange={handleChange} readOnly disabled />

                        </div>

                        <div className='form-group'>
                            <label htmlFor="{id + 'email'}">Email</label>
                            <input id="{id + 'email'}"
                                name="email"
                                value={updateEmployees.email}
                                onChange={handleChange} readOnly disabled />

                        </div>


                        <div className='form-group'>
                            <label htmlFor={id + 'dateofjoining'}>Date of joining :</label>
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
                            />

                        </div>

                        <div className='form-group'>
                            <label htmlFor={id + 'dateofbirth'}>Date of Birth :</label>
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
                            />

                        </div>

                        <div className='form-group'>
                            <label htmlFor={id + 'department'}>Department :</label>
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
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor={id + 'position'}>Position :</label>
                            <input id={id + 'position'}
                                type="text"
                                placeholder=" Enter the position"
                                name="position"
                                value={updateEmployees.position}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor={id + 'reportingto'}>Reporting To :</label>
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

                            </select>
                        </div>


                        {errors && <div className="error">
                            {`Please include: ${errors}`}
                        </div>
                        }
                        <button type="submit" className="btn"
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        

    );
};

// showIcon
//toggleCalendarOnIconClick
//closeOnScroll={true}