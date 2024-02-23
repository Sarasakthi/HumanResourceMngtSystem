import React, { useState } from 'react'
import userService from '../services/user.service';

export const Document = (fileName) => {
const[name,setName] = useState("")
setName(fileName)
console.log("NAME", name)

  return (
    <div>
        console.log("Reached Document")
    console.log("filename from Document",name);
    userService.verifyingEmpSkills(name)
    </div>
  )
}
