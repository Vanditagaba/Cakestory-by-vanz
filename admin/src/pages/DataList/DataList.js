import React from "react";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import DataTable from "../../components/DataTable/DataTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./dataList.scss";

const DataList = ({
  rows,
  columns,
  title,
  toolbar,
  cta,
  ctaTitle,
  ctaLink,
  RowId,
}) => {
  return (
    <>
      <div className="dataListContainer">
        <Sidebar />

        <AnimatedPage>
          <div className="dataList">
            <DataTable
              rows={rows}
              columns={columns}
              title={title}
              toolbar={toolbar}
              cta={cta}
              ctaLink={ctaLink}
              ctaTitle={ctaTitle}
              getRowId={RowId}
            />
          </div>
        </AnimatedPage>
      </div>
    </>
  );
};

export default DataList;
