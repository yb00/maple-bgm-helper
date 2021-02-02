import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "./MusicSelectTable.css";

const MusicTableSettings = {
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
  domLayout: "autoHeight",
};

const MusicSelectTable = ({ src }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [data, setData] = useState([]);

  const [playlist, setPlaylist] = useState([])

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const setSelectedData = () => {
    const nodes = gridApi.getSelectedNodes()
    const yt_ids = nodes.map(node => node.data.youtube)
    setPlaylist(yt_ids)
  }

  useEffect(() => {
    setData(src);
  }, [src]);

  return (
    <>
      <div className="ag-theme-alpine music-table-wrapper">
        <input type="text" className="table-search-input"></input>
        <button onClick={() => gridApi.deselectAll()}>Clear Selected</button>
        <AgGridReact
          rowData={data}
          {...MusicTableSettings}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          rowClassRules={{ "row-selected": "data.selected === true" }}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
          onSelectionChanged={() => setSelectedData()}
        >
          <AgGridColumn
            headerName="Song Name"
            field="metadata.title"
            checkboxSelection={true}
            cellRenderer={(params) => {
              const id = params.data.youtube;
              const title = params.data.metadata.title;
              return (
                '<a href="https://youtu.be/' +
                id +
                '" target="_blank" rel="noopener noreferrer">#</a>' +
                ` ${title}`
              );
            }}
          />
          <AgGridColumn headerName="Year" field="metadata.year" />
        </AgGridReact>
      </div>
    </>
  );
};

export default MusicSelectTable;
