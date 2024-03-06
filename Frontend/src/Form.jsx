
/*import React from 'react'
import { Input } from './components'
import { FormProvider, useForm } from 'react-hook-form'
import {
    username_validation,
    desc_validation,
    email_validation,
    num_validation,
    password_validation,
} from './utils/inputValidations'
import { useState } from 'react'
import { GrMail } from 'react-icons/gr'
import { BsFillCheckSquareFill } from 'react-icons/bs'

export const Form = () => {
    const methods = useForm()
    const [success, setSuccess] = useState(false)

    const onSubmit = methods.handleSubmit(data => {
        console.log(data)
        methods.reset()
        setSuccess(true)
    })

    return (
        <div className="container">
            <FormProvider {...methods}>
                <form
                    onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off"

                >

                    <div >
                        <Input {...username_validation} />
                    </div>
                    <div >
                        <Input {...email_validation} />
                    </div>
                    <div >
                        <Input {...password_validation} />
                    </div>



                    {success &&
                        <p >
                            <BsFillCheckSquareFill />  Form has been submitted successfully

                        </p>
                    }


                    <button className="btn btn-primary mb-3"
                        onClick={onSubmit}
                    >
                        <GrMail />
                        Submit Form
                    </button>

                </form>
            </FormProvider>
        </div>
    )
}*/