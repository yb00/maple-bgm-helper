import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "./MusicSelectTable.css"

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
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const setRowData = () => {
    setData(
      src.map((obj) => {
        return { ...obj, selected: false };
      })
    );
  };

  const setSelectedData = (idx) => {
    var newData = data;
    newData[idx].selected = !data[idx].selected;
    setData(newData);
  };

  useEffect(() => {
    setRowData();
  }, [src]);

  const addToSelection = (obj, node) => {
    const yt_id = obj.youtube;
    const node_id = node.id;
    console.log(node_id, data[node_id].selected);
    if (selection.indexOf(yt_id) === -1) {
      setSelection([...selection, yt_id]);
      setSelectedData(node_id);
    }
  };

  return (
    <>
      <div className="ag-theme-alpine select-table">
        <input type="text" className="table-search-input"></input>
        <AgGridReact
          rowData={data}
          {...MusicTableSettings}
          onRowClicked={(params) => {
            addToSelection(params.data, params.node);
          }}
          onFirstDataRendered={onFirstDataRendered}
        >
          <AgGridColumn
            headerName="Song Name"
            field="metadata.title"
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
