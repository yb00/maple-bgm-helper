import React, { useState, useEffect, FunctionComponent, useRef } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import {
    ColDef,
    ColumnApi,
    FirstDataRenderedEvent,
    Grid,
    GridOptions,
    GridReadyEvent,
    ModuleRegistry,
} from 'ag-grid-community'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import './MusicSelectTable.css'
import { useDataSourceState } from './DataSourceProvider'

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
    const gridApi = useRef<ColumnApi | null>(null)
    const colDef = useRef<ColDef[]>([])
    const gridOptions = useRef<GridOptions | undefined>(undefined)
    const gridColumnApi = useRef<ColumnApi | null>(null)
    colDef.current = getColDef()
    gridOptions.current = getGridOptions()

    const onGridReady = (params: GridReadyEvent): void => {
        gridApi.current = params.api
        gridColumnApi.current = params.columnApi
    }

    const onFirstDataRendered = (event: FirstDataRenderedEvent): void => {
        event.columnApi.autoSizeAllColumns()
    }

    // const [playlist, setPlaylist] = useState([]);

    // const setSelectedData = () => {
    //   var nodes;
    //   if(gridApi != null)
    //     nodes = gridApi.getSelectedNodes();
    //   const yt_ids = nodes.map((node) => node.data.youtube);
    //   setPlaylist(yt_ids);
    // };

    return (
        <AgGridReact
            columnDefs={colDef.current}
            rowData={dataSource}
            gridOptions={gridOptions}
            onFirstDataRendered={onFirstDataRendered}
            onGridReady={onGridReady}
            
            >
        
        </AgGridReact>
    )
}

export default MusicSelectTable
