import React, { useId, useState } from 'react'

const id = useId;



function EmployeeDetails() {

    const [employeeDetails, setEmployeeDetails] = useState({
        firstname: ""
    });

    function handleChange(event) {
        setEmployeeDetails(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    function submitData(){
        axios.post("http://localhost:8080/addemployee/add",{
            firstname : employeeDetails.firstname
        })
    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor={id + 'firstname'}>Firstname : </label>
                    <input id={id + 'firstname'}
                        type="text"
                        placeholder=" Enter Firstname"
                        name="firstname"
                        value={employeeDetails.firstname}
                        onChange={handleChange}
                        required />
                </div>
                <button >submit</button>
            </form>
        </div>
    )
}

export default EmployeeDetails;