import * as React from "react"
import { useEffect, useId, useMemo, useState } from "react";
import EmployeeDataService from "../services/employee.service";
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import tablecss from './searchEmployeeform.css'
import mData from './MOCK_DATA.json'


let d = new Date();
export default function SearchEmployeeForm(props) {

    const [formData, setFormData] = useState({
        searchingtext: "",
        radiobutton: "",
        checkbox: false
    });

    const [employees, setEmployees] = useState([]);
    const [showEmployees, setShowEmployees] = useState(false);
    const id = useId;
    const [value, setValue] = useState([]);
    let data
    let newempl


    const fetchInfo = () => {
        if ((formData.searchingtext == "") && (formData.radiobutton !== 'all')) {
            alert("Please choose one of the option")
            setShowEmployees(false);
        }
        else if (formData.searchingtext != "") {
            EmployeeDataService.getSelectedEmployee(formData.searchingtext)
                .then(response => {
                    console.log("Response from search box", response)
                    setEmployees(response.data)
                    setShowEmployees(true)
                })

                .catch(error => console.log(error))

        }
        else {
            EmployeeDataService.getAllEmployees()
                .then(response => {
                    console.log("Response get all employees", response)
                    setEmployees(response.data)
                    setShowEmployees(true)
                    console.log("Employees inside all", employees)
                })

                .catch(error => console.log(error))
        }

    }


    console.log("Checking Employees", employees)
    
    data = employees
    console.log("Checking Employees Data ", data)

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorKey: 'idEmployee',
            footer: 'ID',
        },

        {
            header: 'First name',
            accessorKey: 'firstname',
            footer: 'First name',
        },
        {
            header: 'Last name',
            accessorKey: 'lastname',
            footer: 'Last name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email',
        },
        {
            header: 'DOB',
            accessorKey: 'dateofbirth',
            footer: 'DOB',
        },
        {
            header: 'Date of joining',
            accessorKey: 'dateofjoining',
            footer: 'Date of joining',

        },
        {
            header: 'Department',
            accessorKey: 'department',
            footer: 'Department',
        },
        {
            header: 'Position',
            accessorKey: 'position',
            footer: 'Position',
        },
        {
            header: 'Reporting To',
            accessorKey: 'reportingto',
            footer: 'Reporting To',
        },
        {
            header: 'Active',
            accessorKey: 'active',
            footer: 'Active',
        },

    ]



    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    /* function handleOnChange(event) {
         const { value, checked } = event.target
         if (checked == true) {
             setValue(prev => [...prev, value])
         }
         else {
 
             setValue(prev => {
                 return [...prev.filter(data => data != value)]
             })
 
         }
     }
     console.log("New Array - id Employee ", value)*/



    function handleSearchChange(event) {

        //formData.radiobutton = ""
        setFormData(() => {
            return {
                radiobutton: "",
                [event.target.name]: event.target.value
            }
        })

    }

    function handleRadioBttonChange(event) {
        setFormData(() => {
            return {
                [event.target.name]: event.target.value,
                radiobutton: formData.radiobutton === "all" ? "" : "all",
                searchingtext: ""
            }
        })

    }

    function uncheck() {

        document.getElementById("{id + 'radiobutton'}").checked = false
    }


    return (
        <>

            <div>
                <label htmlFor="{id + 'searchingtext'}" ></label>

                <input
                    type="text"
                    id={id + 'searchingtext'}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    onClick={uncheck}
                    name="searchingtext"
                    value={formData.searchingtext} />

                <div>
                    <label htmlFor="{id + 'radiobutton'}" >Find all employees</label>

                    <input type="radio"
                        name="radiobutton"
                        id="{id + 'radiobutton'}"
                        value='all'
                        checked={formData.radiobutton === "all"}
                        onClick={handleRadioBttonChange} />

                </div>

            </div>
            <div>
                <button onClick={fetchInfo}>Find</button>
            </div>
            {showEmployees &&
                <div>
                    <table>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}

                                        >
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {
                                                        { asc: '🔼', desc: '🔽' }[
                                                        header.column.getIsSorted() ?? null
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            {table.getFooterGroups().map(footerGroup => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    </table>
                </div>
            }

        </>
    )
}
