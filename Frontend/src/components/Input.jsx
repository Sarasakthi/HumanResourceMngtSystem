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
import moment from 'moment'

export const Input = ({
    name,
    label,
    type,
    id,
    placeholder,
    validation,
    checkbox,
    dateFormat,
    className,
    array
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
        <>
            <div className="row mb-2">

                {dateFormat ? <div>
                    <label className="col-sm-2 col-form-label"
                        htmlFor={id} >

                        {label}

                    </label>

                    <input
                        className="col-sm-3"
                        id={id}
                        type={type}
                        selected={null}
                        placeholder={placeholder}
                        {...register(name, validation)}
                    />
                </div>
                    :
                    <div>
                        {
                            checkbox ?
                                <div >
                                    {array.map((arrayitems) =>
                                        <label className="col-sm-2 col-form-label"

                                            htmlFor={arrayitems.technologyName}
                                        >
                                            {arrayitems.technologyName}
                                            <input
                                                key={arrayitems.index}
                                                className="col-sm-3"

                                                id={arrayitems.technologyName}
                                                type={type}
                                               
                                                value={arrayitems.technologyName}
                                                {...register(arrayitems.technologyName, validation)}


                                            />
                                        </label>

                                    )}
                                </div>
                                :
                                <div>
                                    <label className="col-sm-2 col-form-label"
                                        htmlFor={id} >
                                        {label}
                                    </label>
                                    <input
                                        className="col-sm-3"

                                        id={id}
                                        type={type}

                                        placeholder={placeholder}
                                        {...register(name, validation)}
                                    />
                                </div>
                        }
                    </div>
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

        </>
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


/*  <div>
                                    <label className="col-sm-2 col-form-label"
                                        htmlFor={id} >
                                        {label}
                                        <input
                                            className="col-sm-3"

                                            id={id}
                                            type={type}
                                            
                                            placeholder={placeholder}
                                            {...register(name, validation)}
                                        />
                                    </label>
                                </div> */