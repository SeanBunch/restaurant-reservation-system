import React from "react"
import Table from "./Table"


function TableList({ tables, setTablesError, loadDashboard }){
    return(
        <div>
            {tables.map((table) =>(
                <div key={`${table.table_id} ${table.table_name}`}>
                    <Table
                        table_id={table.table_id}
                        table_name={table.table_name}
                        capacity={table.capacity}
                        reservation_id={table.reservation_id}
                        setTablesError={setTablesError}
                        loadDashboard={loadDashboard}
                    />
                </div>
            ))}
        </div>
    )
}

export default TableList