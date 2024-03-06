import React from 'react'
import { useId, useState, useEffect } from 'react'
import { FormProvider, useForm, useController, useFormContext } from 'react-hook-form'
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
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { getValue } from '@testing-library/user-event/dist/utils'

export const EmployeeDetails = ({ receiveEmployeeDetails, managers, departments }) => {
    const [showManagersDropDown, setManagersShowDropDown] = useState(false);
    const [showDepartmentDropDown, setShowDepartmentDropDown] = useState(false);
    const [managersList, setManagersList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([])

    const {getValues} = useForm();
    const methods = useForm()
    


    const [state, setState] = useState({
        message: "",
        successful: false
    })

    useEffect(() => {
        setDepartmentsList(departments)
        setManagersList(managers)
       // console.log("printing getValues",getValues())
    }, [])





    

const onSubmit = (data) => {
    console.log("printing getValues",getValues());
    console.log('Form submitted with data:', data);
    // };
    //const onSubmit = methods.handleSubmit(data => {
    data.dateofjoining = moment(data.dateofjoining)
    data.dateofbirth = moment(data.dateofbirth)


    userService.create(data)
        .then(
            response => {
                console.log("response for create employee", response)
                setState({
                    message: response.data.message,
                    successful: true
                })

            }

            ,
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setState({
                    successful: false,
                    message: resMessage
                });
            }
        );
   
    //methods.reset();
  


}
//    )
 function changeState(value){
console.log("value received in employee details from Input.jsx", value)
setState( () => ({
    message :"",
    successful : value
}))
 }

 function removeState(){
    setState( () => ({
        message :"",
        successful : false
    }))
 }


return (

    <div>
        <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
  >
            
            
            
                <Input {...firstname_validation}
                onClick = {removeState}
                reset ={state.successful}
                sendState = {changeState} />
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
                {state.successful &&
                    <p >
                        <BsFillCheckSquareFill />  Form has been submitted successfully

                    </p>
                } 
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