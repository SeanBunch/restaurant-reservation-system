import React, { useState } from "react"
import { useHistory } from "react-router"
import TableForm from "./TableForm"
import { newTable } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"


function NewTable(){
    const initialFormState = {
        table_name: "",
        capacity: "",
    }
     const [table, setTable] = useState(initialFormState)
     const [error, setError] = useState(null)
     const history = useHistory()

    const changeHandler = (event) => {
        setTable({ ...table, [event.target.name]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        newTable(table, abortController.signal)
            .then(() => {
                history.push("/dashboard")
            })
            .catch(setError)
        return ( () => abortController.abort() )
    }

    return(
        <>
            <ErrorAlert error={error}/>
            <h2>Create New Table</h2>
            <TableForm
                table={table}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </>
    )
}

export default NewTable