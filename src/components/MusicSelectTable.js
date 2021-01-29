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
    const id = obj.youtube
    if (selection.indexOf(id) === -1) {
      setSelection(selection.push(id));
      console.log(data)
    }
  };

  return (
    <div className="ag-theme-alpine select-table">
      <AgGridReact
        rowData={data}
        onFirstDataRendered={onFirstDataRendered}
        pagination={true}
        paginationAutoPageSize={true}
        rowClassRules={{ "selected-cell": "data.selected === 1" }}
      >
        <AgGridColumn headerName="Filename" field="filename"></AgGridColumn>
        <AgGridColumn
          headerName="Youtube ID"
          field="youtube"
          onCellClicked={(params) => {addLink(params.data)}}
        ></AgGridColumn>
        <AgGridColumn
          headerName="Metadata"
          field="metadata.title"
          cellClassRules
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default MusicSelectTable;
