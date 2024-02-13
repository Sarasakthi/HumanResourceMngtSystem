/*-------------------------------------------------------------------
|  🐼 React FC Input
|
|  🐯 Purpose: RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

//import cn from 'classnames'
import React from 'react'
import { findInputError, isFormInvalid } from '../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

export const Input = ({
    name,
    label,
    type,
    id,
    placeholder,
    validation,
    multiline,
    className,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputErrors = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputErrors)

    //const input_tailwind =
    // 'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60'

    return (
        <div>
            <div className="row mb-2">
                <label className="col-sm-2 col-form-label"
                    htmlFor={id} >
                    {label}
                </label>
                

                {multiline ? (

                    <textarea
                        className="form-control"
                        id={id}
                        type={type}

                        placeholder={placeholder}
                        {...register(name, validation)}
                    ></textarea>

                ) :

                    <input
                        className="col-sm-3"

                        id={id}
                        type={type}

                        placeholder={placeholder}
                        {...register(name, validation)}
                    />

                }
            </div>
           
            <AnimatePresence mode="wait" initial={false}  >
                    {isInvalid && (
                        <InputError
                            message={inputErrors.error.message}
                            key={inputErrors.error.message}
                        />
                    )}
                </AnimatePresence>
                
        </div>
    )
}

const InputError = ({ message }) => {
    return (
        <motion.p

            {...framer_error}
        >
            <MdError />
            {message}
        </motion.p>
    )
}

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}
