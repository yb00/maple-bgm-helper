import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ColumnApi,
    FirstDataRenderedEvent,
    SelectionChangedEvent,
    GridApi,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.scss';
import 'ag-grid-community/dist/styles/ag-theme-alpine/sass/ag-theme-alpine.scss';

import './MusicSelectTable.scss';
import { useDataSourceState } from '../context/DataSourceContext';
import { usePlaylistState } from '../context/PlaylistContext';
import { IMusicRecordJson } from '../models/DataModel';

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
    };
};

const getColDef: () => ColDef[] = () => {
    return [
        {
            headerName: 'Song Name',
            field: 'metadata.title',
            checkboxSelection: true,
            cellRenderer: (params) => {
                const id = params.data.youtube;
                const title = params.data.metadata.title;
                return (
                    '<a href="https://youtu.be/' +
                    id +
                    '" target="_blank" rel="noopener noreferrer">#</a>' +
                    ` ${title}`
                );
            },
        },
        {
            headerName: 'Year',
            field: 'metadata.year',
        },
    ];
};

const MusicSelectTable: React.FC<{ query: string | undefined }> = ({
    query,
}) => {
    const dataSource = useDataSourceState();
    // const [playlist, setPlaylist] = usePlaylistState();
    const gridApi = useRef<GridApi | null>(null);
    const gridColumnApi = useRef<ColumnApi | null>(null);
    const colDef = useRef<ColDef[]>([]);
    const gridOptions = useRef<GridOptions | undefined>(undefined);
    colDef.current = getColDef();
    gridOptions.current = getGridOptions();

    const onGridReady = (params: GridReadyEvent): void => {
        gridApi.current = params.api;
        gridColumnApi.current = params.columnApi;
    };
    const onFirstDataRendered = (event: FirstDataRenderedEvent): void => {
        event.columnApi.autoSizeAllColumns();
    };
    const onSelectionChanged = (event: SelectionChangedEvent): void => {
        console.log();
    };

    return (
        <div className="ag-theme-alpine music-table-wrapper">
            <div className="music-grid-panel">
                <div className="centered">
                    <input
                        type="text"
                        className="input-filter"
                        placeholder="Search for songs here."
                    ></input>
                </div>
                <div className="hrule"></div>
                <button
                    className="btn-clear-filter"
                    onClick={() => gridApi.current?.deselectAll()}
                >
                    Clear Selected
                </button>
            </div>
            <AgGridReact
                columnDefs={colDef.current}
                rowData={dataSource}
                gridOptions={gridOptions.current}
                onFirstDataRendered={onFirstDataRendered}
                onGridReady={onGridReady}
                rowClassRules={{ 'row-selected': 'data.selected === true' }}
                rowSelection="multiple"
                rowMultiSelectWithClick={true}
                onSelectionChanged={onSelectionChanged}
            ></AgGridReact>
        </div>
    );
};

export default MusicSelectTable;
