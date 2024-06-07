import React from 'react';
import "./Contact.css";
import { FormProvider, useForm, useController, useFormContext } from 'react-hook-form'
import {
  firstname_validation,
  lastname_validation,
  desc_validation,
  email_validation,
} from '../utils/inputValidations'

import { Input } from './Input'
export const Contact = () => {


  const methods = useForm()

  const onContactSubmit =  methods.handleSubmit((data) => {

    console.log('Form submitted with data:', data);
   methods.reset()
  })
  return (
    <div className='contactMain'>



      <div className="contactPage">

        <div className="Contact">
          <div className="row row-cols-3 mb-4 ">  {/*align-items-start */}
            <div className="col-sm-6">
              <div className='leftColumn'>
                <div className='contactHead mt-5 mb-5'><h3>Contact Form</h3></div>


                <FormProvider {...methods}>
                  <form  onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                  >


                    <div className='firstname-Contact'>
                      <Input {...firstname_validation}
                        autoFocus="autoFocus"

                        rowLabel="form-group row"
                        columnLabel1="col-sm-6 col-form-label"
                        columnLabel2="col-sm-6"
                        inputClassName="form-control" />
                    </div>

                    <div className='lastname-Contact'>
                      <Input {...lastname_validation}
                        rowLabel="form-group row"
                        columnLabel1="col-sm-6 col-form-label"
                        columnLabel2="col-sm-6"
                        inputClassName="form-control" /></div>

                    <div className='email-Contact'>
                      <Input {...email_validation}
                        rowLabel="form-group row"
                        columnLabel1="col-sm-6 col-form-label"
                        columnLabel2="col-sm-6"
                        inputClassName="form-control" /></div>

                    <div className='desc-Contact'>
                      <Input {...desc_validation}
                        rowLabel="form-group row"
                        columnLabel1="col-sm-6 col-form-label"
                        columnLabel2="col-sm-6"
                        inputClassName="form-control" /></div>

                    {/*     <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" />
                      <label className="form-check-label" for="gridCheck">
                        Check me out
                      </label>
                    </div>
  </div>*/}

                    <div >
                      <button
                        className="btn btn-primary btn-block mb-3"
                        onClick={onContactSubmit}
                      >
                        <span>Submit</span>
                      </button>
                    </div>
                  </form></FormProvider>

              </div>



            </div>
            <div className="col-sm-1">
              </div>

            <div className="col-sm-5">
              <div className='rightColumn'>

             
  
    <div className='contactRightEmail'>
   <div> <label className="contactEmail">Email</label></div>
    <div className='contactEmailValue'><input type="text" className="form-control" placeholder="INFO@TJSS.COM"  disabled/></div>
    </div>
    <div className='contactRightPhoneNumber'>
   <div> <label className="contactEmail">PhoneNumber</label></div>
    <div className='contactPhoneNumberValue'><input type="text" className="form-control" placeholder= " CAN : +1 780-708-2463" disabled /></div>
    </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
