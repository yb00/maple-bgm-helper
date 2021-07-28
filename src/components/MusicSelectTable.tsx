import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
    ColDef,
    ColumnApi,
    FirstDataRenderedEvent,
    GridApi,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import './MusicSelectTable.css'
import { useDataSourceState } from '../context/DataSourceContext'

const getGridOptions: () => GridOptions = () => {
    return {
        animateRows: true,
        pagination: true,
        paginationPageSize: 10,
        suppressColumnVirtualisation: true,
        suppressMovableColumns: true,
        rowHeight: 45,
        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
        },
        domLayout: 'autoHeight',
    }
}

const getColDef: () => ColDef[] = () => {
    return [
        {
            headerName: 'Song Name',
            field: 'metadata.title',
            checkboxSelection: true,
            cellRenderer: (params) => {
                const id = params.data.youtube
                const title = params.data.metadata.title
                return (
                    '<a href="https://youtu.be/' +
                    id +
                    '" target="_blank" rel="noopener noreferrer">#</a>' +
                    ` ${title}`
                )
            },
        },
        {
            headerName: 'Year',
            field: 'metadata.year',
        },
    ]
}

const MusicSelectTable: React.FC<{ query: string | undefined }> = ({
    query,
}) => {
    const dataSource = useDataSourceState()
    const gridApi = useRef<GridApi | null>(null)
    const gridColumnApi = useRef<ColumnApi | null>(null)
    const colDef = useRef<ColDef[]>([])
    const gridOptions = useRef<GridOptions | undefined>(undefined)
    colDef.current = getColDef()
    gridOptions.current = getGridOptions()

    const onGridReady = (params: GridReadyEvent): void => {
        gridApi.current = params.api
        gridColumnApi.current = params.columnApi
    }
    const onFirstDataRendered = (event: FirstDataRenderedEvent): void => {
        event.columnApi.autoSizeAllColumns()
    }
    return (
        <div className="ag-theme-alpine music-table-wrapper">
            <input type="text" className="table-search-input"></input>
            <AgGridReact
                columnDefs={colDef.current}
                rowData={dataSource}
                gridOptions={gridOptions.current}
                onFirstDataRendered={onFirstDataRendered}
                onGridReady={onGridReady}
            ></AgGridReact>
        </div>
    )
}

export default MusicSelectTable
