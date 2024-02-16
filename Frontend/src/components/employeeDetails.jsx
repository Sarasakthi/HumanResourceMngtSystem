import React from 'react'
import { useId, useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    firstname_validation,
    lastname_validation,
    desc_validation,
    email_validation,
    num_validation,
    password_validation,
    dateofjoining_validation,
    dateofbirth_validation,
    department_validation,
    position_validation,
    manager_validation
} from '../utils/inputValidations'

import { Input } from './Input'
import { Select } from './Select'
import userService from '../services/user.service'
import * as moment from 'moment'

export const EmployeeDetails = ({ receiveEmployeeDetails, managers, departments }) => {
    const [showManagersDropDown, setManagersShowDropDown] = useState(false);
    const [showDepartmentDropDown, setShowDepartmentDropDown] = useState(false);
    const [managersList, setManagersList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([])
    const [state, setState] = useState({
        message: "",
        loading: false
    })
    const methods = useForm()
    const [employeeDetails, setEmployeeDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        dateofjoining: new Date(),
        dateofbirth: new Date(),
        department: "",
        position: "",
        reportingto: "",
        active: true
    });

    useEffect(() => {
        setDepartmentsList(departments)
        setManagersList(managers)
    }, [])

    const onSubmit = methods.handleSubmit(data => {

        console.log("Firstname", data.firstname)
        console.log("Lastname", data.lastname)
        console.log("Email", data.email)
        console.log("Date of joining", data.dateofjoining)
        console.log("Date of birth", data.dateofbirth)
        console.log("Department", data.department)
        console.log("Position", data.position)
        console.log("Reporting to", data.reportingto)

        data.dateofjoining = moment(data.dateofjoining)
        data.dateofbirth = moment(data.dateofbirth)


        userService.create(data)
            .then(response => console.log("response after submitting to database", response.data))
            .catch(error => console.log(error))

    })


    return (

        <div >


            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                >

                    <Input {...firstname_validation} />
                    <Input {...lastname_validation} />
                    <Input {...email_validation} />
                    <Input {...dateofjoining_validation} />
                    <Input {...dateofbirth_validation} />
                    <Select


                        {...department_validation}
                        array={departmentsList}
                    />
                    <Input {...position_validation} />
                    <Select


                        {...manager_validation}
                        array={managersList}
                    />

                    <div >
                        <button
                            className="btn btn-primary btn-block"
                            onClick={onSubmit}
                        >
                            <span>Submit</span>
                        </button>
                    </div>


                </form>
            </FormProvider>
            {state.message &&
                <div className="form-group">
                    <div
                        className={
                            state.successful
                                ? "alert alert-success"
                                : "alert alert-danger"
                        }
                        role="alert"
                    >
                        {state.message}
                    </div>
                </div>
            }
        </div>

    );
}