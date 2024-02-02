import React from 'react'
import { useId, useState } from 'react'
import "./Modal.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let d = new Date();
export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    console.log("RowToEdit in Modal", defaultValue)
    const [updateEmployees, setUpdateEmployees] = useState(defaultValue || {
        idEmployee: "",
        firstname: "",
        lastname: "",
        email: "",
        dateofjoining: d,
        dateofbirth: d
    })

    
    let joiningDate = new Date(updateEmployees.dateofjoining)
    let birthDate = new Date(updateEmployees.dateofbirth)



    const [errors, setErrors] = useState("")

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
        if (updateEmployees.idEmployee && updateEmployees.firstname && updateEmployees.lastname) {
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


    return (
        <div className='modal-container'
            onClick={(e) => {
                if (e.target.className === "modal-container")
                    closeModal();
            }}>
            <div className='modal-body'>
                <form>
                    <div className='form-group'>
                        <label htmlFor="{id + 'ID'}">ID</label>
                        <input id="{id + 'ID'}"
                            name="idEmployee"
                            value={updateEmployees.idEmployee}
                            onChange={handleChange} />

                    </div>

                    <div className='form-group'>
                        <label htmlFor="{id + 'FIRSTNAME'}">Firstname</label>
                        <input id="{id + 'FIRSTNAME'}"
                            name="firstname"
                            value={updateEmployees.firstname}
                            onChange={handleChange} />

                    </div>

                    <div className='form-group'>
                        <label htmlFor="{id + 'LASTNAME'}">Lastname</label>
                        <input id="{id + 'LASTNAME'}"
                            name="lastname"
                            value={updateEmployees.lastname}
                            onChange={handleChange} />

                    </div>

                    <div className='form-group'>
                        <label htmlFor="{id + 'email'}">Email</label>
                        <input id="{id + 'email'}"
                            name="email"
                            value={updateEmployees.email}
                            onChange={handleChange} />

                    </div>


                    <div className='form-group'>
                        <label htmlFor={id + 'dateofjoining'}>Date of joining :</label>
                        <DatePicker
                            placeholderText="Date of joining"
                            id={id + 'dateofjoining'}
                            type="Date"
                            dateFormat={"yyyy-MM-dd"}
                            selected={joiningDate}
                            onChange={(date) => setUpdateEmployees((prevData) => {
                                return {
                                    ...prevData,
                                    dateofjoining: date
                                }
                            })}
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
                        />

                    </div>


                    {errors && <div className="error">
                        {`Please include: ${errors}`}
                    </div>
                    }
                    <button type="submit" className='btn-modal'
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

// showIcon
//toggleCalendarOnIconClick
//closeOnScroll={true}