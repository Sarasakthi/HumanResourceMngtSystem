import React from 'react'

import "./Passwordmodal.css"
import {
    new_password_validation,
    confirm_Password_validation,
    dateofbirth_validation

} from '../utils/inputValidations'

import { FormProvider, useForm } from 'react-hook-form'
import { Input } from './Input'
import moment from 'moment'


export const Passwordmodal = ({ closeModal, receivePassword,email }) => {
    const methods = useForm()


    const onSubmit = methods.handleSubmit(data => {
        //let newPassword = data.newPassword
        //let confirmPassword = data.confirmpassword
        data.email = email
        data.newPassword = data.newPassword
        data.dateofbirth = moment(data.dateofbirth)
        
      /*  if (newPassword !== confirmPassword) {
            alert("confirm password should be the same as new password");
        }
        else {*/
            receivePassword(data)
            closeModal()
      //  }
    })
    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") { closeModal() };
            }}
        >
            <div className='modal-body' >
                <FormProvider {...methods}>
                    <form>
                    <Input {...dateofbirth_validation}
                    autoFocus= "autoFocus" />
                        <Input {...new_password_validation} />

                      
                        <div>
                            <button
                                className="btn btn-primary btn-block"
                                onClick={onSubmit}
                            >
                                <span>submit</span>
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div >

    )
}
