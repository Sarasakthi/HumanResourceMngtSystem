import React, { useId, useState } from "react"

export default function SearchEmployee() {
   
    const[formData,setFormData] = useState({
        searchingtext : "",
        radiobutton :""
    })
    const id = useId;

    function handleChange(event){
        const{name,value,type,checked} = event.target
        setFormData(prevFormData =>
            {
                return {
                    ...prevFormData,
                    [name] : type ==="checked" ? checked : value
                }
            })
    }

    return (
        <>
            <div>
                <label htmlFor= {id + 'searchingtext'} ></label>
                <input
                    type="text"
                    id={id + 'searchingtext'}
                    placeholder="Search" 
                    onChange={handleChange}
                    name = "searchingtext"
                    value = {formData.searchingtext}/>
            </div>
            <div>
                <input type="radio"

                 />
            </div>
        </>
    )
}