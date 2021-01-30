import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "./MusicSelectTable.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const MusicSelectTable = ({ src }) => {
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      src.map((obj) => {
        return { ...obj, selected: 0 };
      })
    );
  }, [src]);

  const addLink = (obj) => {
    const id = obj.youtube;
    if (selection.indexOf(id) === -1) {
      setSelection(selection.push(id));
    }
    console.log(obj);
  };

  return (
    <div className="ag-theme-alpine select-table">
      <AgGridReact
        rowData={data}
        onFirstDataRendered={onFirstDataRendered}
        pagination={true}
        paginationAutoPageSize={true}
      >
        <AgGridColumn
          headerName="Song Name"
          field="metadata.title"
          onCellClicked={(params) => {
            addLink(params.data);
          }}
          cellRenderer={(params) => {
            const id = params.data.youtube;
            const title = params.data.metadata.title;
            return '<a href="https://youtu.be/' + id + '" target="_blank" rel="noopener noreferrer">#</a>' + ` ${title}`
          }}
        />
        <AgGridColumn headerName="Year" field="metadata.year" />
      </AgGridReact>
    </div>
  );
};

export default MusicSelectTable;
