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

export const Select = ({
    name,
    label,
    id,
    validation,
    array,
    inputClassName,
    rowLabel,
    columnLabel1,

}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputErrors = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputErrors)


    return (
        <div>

            <div className={rowLabel}>
                <div className={columnLabel1}>
                    <label
                        htmlFor={id} 
                        style={{ marginLeft: '0px' }}>
                        {label}
                    </label>
                    {/*  <div className={columnLabel2 }> */}
                    <select
                        className={inputClassName}
                        id={id}
                        {...register(name, validation)}
                    >
                        {array.map((arrayitems) =>

                            <option value={arrayitems.departmentName ? arrayitems.departmentName : arrayitems.firstname + ` - ` + `${arrayitems.department}`}>
                                {arrayitems.departmentName ? arrayitems.departmentName : arrayitems.firstname + ` - ` + `${arrayitems.department}`}
                            </option>

                        )}

                    </select>
                </div>
            </div>
            {/* </div> */}

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
