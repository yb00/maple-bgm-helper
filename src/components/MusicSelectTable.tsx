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

type Metadata = {
    albumArtist: string
    artist: string
    title: string
    year: string
}

type Source = {
    client: string
    date: string
    structure: string
    version: string
}

type srcData = {
    description: string
    filename: string
    mark: string
    metadata: Metadata
    source: Source
    youtube: string
}

type MusicTableProps = {
    src: srcData[]
}

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

const MusicSelectTable: FunctionComponent<MusicTableProps> = ({ src }) => {

    const gridApi = useRef<ColumnApi | null>(null)
    const colDef = useRef<ColDef[]>([])
    const gridOptions = useRef<GridOptions | undefined>(undefined)
    const gridColumnApi = useRef<ColumnApi | null>(null)
    colDef.current = getColDef();
    gridOptions.current = getGridOptions();

    const onGridReady = (params: GridReadyEvent): void => {
      gridApi.current = params.api;
      gridColumnApi.current = params.columnApi;
    };
  
    const onFirstDataRendered = (event: FirstDataRenderedEvent): void => {
      event.columnApi.autoSizeAllColumns();
    };

    const [data, setData] = useState([])

    // const [playlist, setPlaylist] = useState([]);

    // const setSelectedData = () => {
    //   var nodes;
    //   if(gridApi != null)
    //     nodes = gridApi.getSelectedNodes();
    //   const yt_ids = nodes.map((node) => node.data.youtube);
    //   setPlaylist(yt_ids);
    // };

    useEffect(() => {
        setData(src)
    }, [src])

    return (
        <div></div>
        //   <div className="row">
        //     <div className="ag-theme-alpine music-table-wrapper">
        //       <input type="text" className="table-search-input"></input>
        //       <button className="music-table-clear" onClick={() => gridApi.deselectAll()}>Clear Selected</button>
        //       <AgGridReact
        //         rowData={data}
        //         {...MusicTableSettings}
        //         onGridReady={onGridReady}
        //         onFirstDataRendered={onFirstDataRendered}
        //         rowClassRules={{ "row-selected": "data.selected === true" }}
        //         rowSelection="multiple"
        //         rowMultiSelectWithClick={true}
        //         onSelectionChanged={() => setSelectedData()}
        //       >
        //         <AgGridColumn
        //           headerName="Song Name"
        //           field="metadata.title"
        //           checkboxSelection={true}
        //           cellRenderer={(params) => {
        //             const id = params.data.youtube;
        //             const title = params.data.metadata.title;
        //             return (
        //               '<a href="https://youtu.be/' +
        //               id +
        //               '" target="_blank" rel="noopener noreferrer">#</a>' +
        //               ` ${title}`
        //             );
        //           }}
        //         />
        //         <AgGridColumn headerName="Year" field="metadata.year" />
        //       </AgGridReact>
        //     </div>
        //     <div style={{ width: "1rem" }}></div>
        //     <div>
        //       <input
        //         className="generated"
        //         value={
        //           playlist.length === 0
        //             ? ""
        //             : `youtube-dl ${playlist.map(id => id).join(' ') }`
        //         }
        //         placeholder="Download config for youtube-dl will show up here."
        //       ></input>
        //       <p>Selected: </p>
        //       <div className="selected">
        //         {playlist.map((id) => (
        //           <span>{id}</span>
        //         ))}
        //       </div>
        //     </div>
        //   </div>
    )
}

export default MusicSelectTable
