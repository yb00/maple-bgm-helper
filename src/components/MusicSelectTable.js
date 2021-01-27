import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "./MusicSelectTable.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const MusicSelectTable = ({ src }) => {
  return (
    <div className="ag-theme-alpine select-table">
      <AgGridReact
        rowData={src}
        onFirstDataRendered={onFirstDataRendered}
        pagination={true}
        paginationAutoPageSize={true}
      >
        <AgGridColumn headerName="Filename" field="filename"></AgGridColumn>
        <AgGridColumn headerName="Youtube ID" field="youtube"></AgGridColumn>
        <AgGridColumn
          headerName="Metadata"
          field="metadata.title"
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default MusicSelectTable;
