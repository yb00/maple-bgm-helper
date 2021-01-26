import React from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const MusicSelectTable = () => {
  return (
    <div className="ag-theme-alpine select-table">
      <AgGridReact rowData={bgm} onFirstDataRendered={onFirstDataRendered}>
        <AgGridColumn field="metadata.title"></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default MusicSelectTable;
