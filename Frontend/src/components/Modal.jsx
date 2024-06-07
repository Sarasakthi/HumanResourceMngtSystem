import React from 'react'
import { useId, useState, useEffect } from 'react'
import "./Modal.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';
import { Input } from './Input'
import {
    num_validation,
    new_password_validation,
    confirm_Password_validation,
    dateofbirth_validation

} from '../utils/inputValidations'
import { FormProvider, useForm } from 'react-hook-form'
import moment from 'moment'
import userService from "../services/user.service";

let d = new Date();
export const Modal = ({ isPasswordOpen, isDeleteOpen, isOpen, onClose, defaultValue, onSubmit, managers, departments, closeModal, receivePassword, email }) => {
    const methods = useForm()

    console.log("reached modal");
console.log("checking isPasswordOpen",isPasswordOpen)

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

    const [errors, setErrors] = useState("");

    const [managersList, setManagersList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([])
    const [showManagersDropDown, setManagersShowDropDown] = useState(false);
    const [showDepartmentDropDown, setShowDepartmentDropDown] = useState(false);
    //const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [deleteId, setDeleteId] = useState("");
    const [message, setMessage] = useState();



    useEffect(() => {
        console.log("inside useEffect")
        setDepartmentsList(departments)
        setManagersList(managers)
    }, [message])


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

    const handleDeleteChange = (e) => {
        setMessage();
        console.log("reached handleDeleteChange");
        if (e.target.value >= 0) {
            setDeleteId(
                [e.target.name] = e.target.value
            )
        }
        console.log("set the deleteId");

    }
    console.log("deleteId - 1", deleteId)
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
        onClose()
        alert("Employee updated successfully!")

    }

    const handleDelete = (e) => {
        console.log("reached handledelte")
        console.log("deleteId - 2", deleteId)
        if (deleteId == "") {
            setMessage("Please enter ID")
            e.preventDefault();
        }
        else if (deleteId != defaultValue.idEmployee) {
            setMessage("ID doesn't match!. Please enter the correct ID")
            e.preventDefault();
        }
        else {
            onSubmit(defaultValue.idEmployee)
            onClose()
            alert("Employee deleted successfully!")
        }

    }
    function getmanagersdatafromdb() {
        setManagersShowDropDown(true);
    }

    function getdepartmentsdatafromdb() {
        setShowDepartmentDropDown(true);

    }
    const deleteStyle = {
        maxHeight: '0%',
    };
    const deleteContentStyle = {
        marginBottom: '400px',
        paddingBottom: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',

    }

    const passwordStyle = {
        maxHeight: '0%',
        minWidth: '350px',
        maxWidth :'450px'
       
    }
    const passwordContentStyle = {
        
    }

    const onPasswordSubmit = methods.handleSubmit(data => {
        console.log("reached password submit")
        console.log("data",data)
        data.email = email
        data.newPassword = data.newPassword
        data.dateofbirth = moment(data.dateofbirth)
        console.log("email - ",data.email)
        console.log("newPassword - ",data.newPassword)
        console.log("dateofbirth - ",data.dateofbirth)
        receivePassword(data)
        userService.passwordUpdate(data)
            .then(response => {
                console.log("response after password updated", response)
                if (response.data.message === "Password updated successfully!") {
                    methods.reset();
                    alert("Password updated successfully!")
                   
                    closeModal()
                    
                    //e.preventDefault();
                   // methods.preventDefault();
                }
                else{
                    setMessage("Date of birth doesn't match!");
                    methods.reset();
                }
            })
            .catch(error => console.log(error))
    })
    return (
        <>
            {isOpen && (
                <div className="modal-container">

                    <div className="modal-content">
                        <div className='titleandbutton'>
                            <span className="close-button" onClick={onClose}>&times;</span>
                            <div className='modal-title'>
                                <h2>Update employee</h2>
                            </div>
                        </div>
                        <div className='modal-scrollable-content'>
                            <form>
                                <div className='fields'>


                                    <div className='form-group'>
                                        <div className='idmod'>
                                            <label htmlFor="{id + 'ID'}">ID
                                            </label>
                                            <input
                                                id="{id + 'ID'}"
                                                name="idEmployee"
                                                value={updateEmployees.idEmployee}
                                                onChange={handleChange} readOnly disabled />
                                        </div>

                                    </div>




                                    <div className='form-group'>
                                        <div className='firstnamemod'>
                                            <label htmlFor="{id + 'FIRSTNAME'}">Firstname:</label>


                                            <input id="{id + 'FIRSTNAME'}"
                                                name="firstname"
                                                value={updateEmployees.firstname}
                                                onChange={handleChange} readOnly disabled />
                                        </div>
                                    </div>






                                    <div className='form-group'>
                                        <div className='lastnamemod'>
                                            <label htmlFor="{id + 'LASTNAME'}">Lastname:</label>


                                            <input id="{id + 'LASTNAME'}"
                                                name="lastname"
                                                value={updateEmployees.lastname}
                                                onChange={handleChange} readOnly disabled />


                                        </div>
                                    </div>


                                    <div className='form-group'>
                                        <div className='emailmod'>
                                            <label htmlFor="{id + 'email'}">Email:</label>


                                            <input id="{id + 'email'}"
                                                name="email"
                                                value={updateEmployees.email}
                                                onChange={handleChange} readOnly disabled />


                                        </div>
                                    </div>


                                    <div className='form-group'>
                                        <div className='dateofjoiningmod'>
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
                                    </div>



                                    <div className='form-group'>
                                        <div className='dateofbirthmod'>
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
                                    </div>


                                    <div className='form-group'>
                                        <div className='departmentmod'>
                                            <label htmlFor={id + 'department'}>Department:</label>

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
                                    </div>


                                    <div className='form-group'>
                                        <div className='positionmod'>
                                            <label htmlFor={id + 'position'}>Position:</label>


                                            <input id={id + 'position'}
                                                type="text"
                                                placeholder=" Enter the position"
                                                name="position"
                                                value={updateEmployees.position}
                                                onChange={handleChange}
                                                required />

                                        </div>

                                    </div>

                                    <div className='form-group'>
                                        <div className='reportingtomod'>
                                            <label htmlFor={id + 'reportingto'}>Reporting To:</label>

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

                                    </div>
                                    {errors && <div className="error">
                                        {`Please include: ${errors}`}
                                    </div>
                                    }
                                    <div className='subbtn'>
                                        <button type="submit" className="btn btn-primary"
                                            onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            )
            }
            {isDeleteOpen && (
                <div style={deleteStyle} className="modal-container">

                    <div style={deleteContentStyle} className="modal-content">
                        <div className='titleandbuttondeletemod'>
                            <span className="close-button" onClick={onClose}>&times;</span>
                            <div className='modal-title'>
                                <h2>Enter ID to delete employee </h2>
                            </div>
                        </div>
                        <div className='scrollable-content'>
                            <form>
                                {message && <span className='message'><h4>{message}</h4></span>}
                                <div className='form-group'>
                                    <div className='iddeletemod'>
                                        <label htmlFor="{id + 'IDdelete'}">ID Employee
                                        </label>
                                        <input
                                            type='number'
                                            id="{id + 'IDdelete'}"
                                            name="deleteId"
                                            value={deleteId}
                                            onChange={handleDeleteChange} />
                                    </div>

                                </div>



                                <div className='subbtn'>
                                    <button type="submit" className="confirmbtn"
                                        onClick={handleDelete}>
                                        confirm
                                    </button>
                                    <button type="submit" className="cancelbtn"
                                        onClick={onClose}>
                                        cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            )
            }


            {isPasswordOpen && (
                <div style={passwordStyle} className="modal-container"
                    onClick={(e) => {
                        if (e.target.className === "modal-container") { closeModal() };
                    }}>

                    <div style={passwordContentStyle} className="modal-content">
                        <div className='titleandbuttonpasswordmod'>
                            <span className="close-button" onClick={onClose}>&times;</span>
                            <div className='modal-title'>
                                <h2>Change password</h2>
                            </div>
                        </div>
                        <div className='scrollable-content' >

                            <FormProvider {...methods}>
                                <form>
                                    {message && <span className='message'><h4>{message}</h4></span>}
                                    <div className='form-group'>
                                        <div className='dateOfBirthModal'>
                                            <Input {...dateofbirth_validation}
                                                autoFocus="autoFocus"
                                                

                                            />
                                        </div>
                                        
                                        <div className='newPasswordModal'>
                                            <Input {...new_password_validation}
                                               />
                                        </div>
                                        

                                    </div>


                                    <div className='subbtn'>
                                        <button type="submit" className="confirmbtn"
                                            onClick={onPasswordSubmit}>
                                            confirm
                                        </button>
                                        <button type="submit" className="cancelbtn"
                                            onClick={onClose}>
                                            cancel
                                        </button>
                                    </div>


                                </form>
                            </FormProvider>

                        </div>
                    </div>

                </div>
            )
            }

        </>
    );

}




















// showIcon
//toggleCalendarOnIconClick
//closeOnScroll={true}