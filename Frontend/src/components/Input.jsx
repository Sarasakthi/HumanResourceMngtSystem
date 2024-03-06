/*-------------------------------------------------------------------
|  🐼 React FC Input
|
|  🐯 Purpose: RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

//import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { findInputError, isFormInvalid } from '../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import moment from 'moment'

/*export const Input = ({
    name,
    label,
    type,
    id,
    placeholder,
    validation,
    checkbox,
    dateFormat,
    className,
    array,
    skills
}) => {
    const {
        register,
        formState: { errors },

    } = useFormContext()*/

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
    array,
    skills,
    reset,
   sendState
}) => {
    const { register, formState: { errors },
        setValue, getValues } = useFormContext();


const[resetValue, setResetValue] = useState(false)
    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        console.log("reset.successful - 1 : ",reset )
        reset= false;
        console.log("reset.successful - 2 : ",reset )
        
        // Update the form value using setValue
        setValue(fieldName, fieldValue);
        //sendState(resetValue)
       

        //onChange(resetValue)
        // Log the changes to the console
        console.log('Form value changed -1 :', getValues());
        console.log('Form value changed -2 :', getValues().firstname);
    };


    const handleSetState = () => {
        console.log("printing reset value",resetValue)
       // sendState(resetValue)
    }
    const inputErrors = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputErrors)


    console.log("skills in input.jsx", skills)
    console.log("array in input.jsx", array)

    const [technologyName, setTechnologyName] = useState([])


    const set1 = new Set(skills);

    useEffect(() => {
        console.log("skills length - ", set1.size)
        if (set1.size != 0) {
            setTechnologyName(array.filter(value => !set1.has(value)))
        }
        else {
            setTechnologyName(array);
        }
    }
        , [skills])

    console.log("Final Technolody names", technologyName);
    
// {/*  tried to change state.successful = false in employeeDetatils.jsx but using onClick and onChange we can set and get values of input fields only, not any other state or elements */}
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
                        onChange={handleChange}
                        onClick={handleSetState}
                    />
                </div>
                    :
                    <div>
                        {
                            checkbox ?

                                <div >
                                    {technologyName.map((arrayitems) =>
                                        <label className="col-sm-2 col-form-label"

                                            htmlFor={arrayitems}
                                        >
                                            {arrayitems}
                                            <input
                                                key={arrayitems.index}
                                                className="col-sm-3"

                                                id={arrayitems}
                                                type={type}

                                                value={arrayitems}
                                                {...register(arrayitems, validation)}
                                                onChange={handleChange}
                                                onClick={handleSetState} 

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
                                        onChange={handleChange}
                                        onClick={handleSetState}
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

