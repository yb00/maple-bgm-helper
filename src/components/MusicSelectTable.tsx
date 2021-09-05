import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ColumnApi,
    FirstDataRenderedEvent,
    FilterChangedEvent,
    ModelUpdatedEvent,
    SelectionChangedEvent,
    RowNode,
    GridApi,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.scss';
import 'ag-grid-community/dist/styles/ag-theme-alpine/sass/ag-theme-alpine.scss';

import './MusicSelectTable.scss';
import { useDataSourceState } from '../context/DataSourceContext';
import { usePlaylistState } from '../context/PlaylistContext';
import { IMusicRecordJson, IMusicRecordGrid } from '../models/DataModel';

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

const MusicSelectTable: React.FC<{}> = ({}) => {
    const [filterText, setFilterText] = useState<string>();
    const dataSource = useDataSourceState();
    // const [playlist, setPlaylist] = usePlaylistState();
    const gridApi = useRef<GridApi | null>(null);
    const [gridFiltered, setGridFiltered] = useState<boolean>(false);
    const gridColumnApi = useRef<ColumnApi | null>(null);
    const colDef = useRef<ColDef[]>([]);
    const gridOptions = useRef<GridOptions | undefined>(undefined);
    colDef.current = getColDef();
    gridOptions.current = getGridOptions();

    const onFilterTextChanged: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void = (event) => {
        setFilterText(event.target.value);
        gridApi.current?.setQuickFilter(filterText);
    };

    const onFilterTextKeyPress: (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => void = (event) => {
        if (event.key === 'Enter' && document.activeElement) {
            const activeElement = document.activeElement as HTMLElement;
            activeElement.blur();
        }
    };

    const onFilterChanged = (event: FilterChangedEvent): void => {
        const filterPresent = event.api.isAnyFilterPresent();
        const filteredSongs: IMusicRecordJson[] = [];
        event.api.forEachNodeAfterFilter((rowNode: RowNode, index: number) => {
            filteredSongs.push(rowNode.data);
        });
    };

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

    const onModelUpdated = (event: ModelUpdatedEvent): void => {
        const rows = event.api.getDisplayedRowCount();
        if (rows > 0) {
            event.api.hideOverlay();
        } else {
            event.api.showNoRowsOverlay();
        }
    };

    return (
        <div className="music-table__wrapper">
            <div className="music-table__panel">
                    <input
                        type="text"
                        placeholder="Search for songs here."
                        onChange={onFilterTextChanged}
                    ></input>
                <div className="hrule"></div>
                <button
                    className="clear"
                    onClick={() => gridApi.current?.deselectAll()}
                >
                    Clear Selected
                </button>
            </div>
            <div className="ag-theme-alpine music-table__grid">
                <AgGridReact
                    columnDefs={colDef.current}
                    gridOptions={gridOptions.current}
                    onFilterChanged={onFilterChanged}
                    onFirstDataRendered={onFirstDataRendered}
                    onGridReady={onGridReady}
                    onModelUpdated={onModelUpdated}
                    onSelectionChanged={onSelectionChanged}
                    rowClass={'grid-row'}
                    rowClassRules={{ 'row-selected': 'data.selected === true' }}
                    rowData={dataSource}
                    rowMultiSelectWithClick={true}
                    rowSelection="multiple"
                ></AgGridReact>
            </div>
        </div>
    );
};

export default MusicSelectTable;
