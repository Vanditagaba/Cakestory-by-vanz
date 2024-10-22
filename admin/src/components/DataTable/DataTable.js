import React from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";

const DataTable = ({
  rows,
  columns,
  toolbar,
  title,
  cta,
  ctaTitle,
  ctaLink,
  RowId,
}) => {
  return (
    <>
      <div className="dataTableContainer">
        <div className="titleContainer">
          <p className="title">{title}</p>
          {cta && (
            <Link to={ctaLink} className="text-reset">
              <button className="cta">{ctaTitle}</button>
            </Link>
          )}
        </div>
        <div className="gridContainer">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[5]}
            checkboxSelection
            className="dataTable"
            components={toolbar && { Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </>
  );
};

export default DataTable;
