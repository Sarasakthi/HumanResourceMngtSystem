/* import * as React from "react"
import { useEffect, useId, useMemo, useState } from "react";
import EmployeeDataService from "../services/employee.service";
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'




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
    let defaultData


    /*fetching details from the database */
  /*  const fetchInfo = () => {
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

*/
  //  console.log("Checking Employees", employees)
    /*Assigning employees array into data */
   // defaultData = employees
    //console.log("Checking Employees Data ", defaultData)

    /*Adding editable cells*/

   /* const TableCell = ({ getValue, row, column }) => {
        //const TableCell = ({ getValue, row, column,table }) => {
        const initialValue = getValue()
        const [value, setValue] = useState(initialValue)
        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        const onBlur = () => {
            if (table.options.meta) {
                //table.updateData(row.index, column.id, value)} 
                updateData(row.index, column.id, value)
            }

            return (
                <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={onBlur}
                    type={column.columnDef.meta? value : "text"}
                />
            )
        }

*/

    //    /** @type import('@tanstack/react-table').ColumnDef<any> */
      /*  const columns = [
            {
                header: 'ID',
                cell: TableCell,
                meta: {
                    type: "number",
                },
            },

            {
                header: 'First name',
                cell: TableCell,
                meta: {
                    type: "text",
                },
            },
            {
                header: 'Last name',
                cell: TableCell,
                meta: {
                    type: "text",
                },
            },
            {
                header: 'Email',
                cell: TableCell,
                meta: {
                    type: "text",
                },
            },
            {
                header: 'DOB',
                cell: TableCell,
                meta: {
                    type: "date",
                },
            },
            {
                header: 'Date of joining',
                cell: TableCell,
                meta: {
                    type: "date",
                },

            },
            {
                header: 'Department',
                cell: TableCell,
                meta: {
                    type: "text",
                },
            },
            {
                header: 'Position',
                cell: TableCell,
                meta: {
                    type: "text",
                },
            },
            {
                header: 'Reporting To',
                cell: TableCell,
                meta: {
                    type: "text",
                },
            },
            {
                header: 'Active',
                cell: TableCell,
                meta: {
                    type: "text",
                },
            }, 

        ]*/

     /*   const [data, setData] = useState(() => [...defaultData]);

        const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            meta: {
                updateData: (rowIndex, columnId, value) => {
                    setData((old) =>
                        old.map((row, index) => {
                            if (index === rowIndex) {
                                return {
                                    ...old[rowIndex],
                                    [columnId]: value,
                                };
                            }
                            return row;
                        })
                    );
                },
            }

        }
        );*/

        //return (...);

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



      /*  function handleSearchChange(event) {

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
            
            </>
        )*/