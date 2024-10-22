import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { selectProductById } from "../../app/slice/productsApiSlice";

const ProductRows = ({ productId }) => {
  const rows = [];
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 100,
      flex: 1,
      cellClassName: "tableCell",
    },
    {
      field: "info",
      headerName: "Product",
      minWidth: 185,
      flex: 2,
      cellClassName: "tableCell",
      renderCell: (params) => {
        return (
          <>
            <div className="listInfoContainer">
              <img src={params.row.img} alt="" className="productImg me-2" />
              <span className="productName">{params.row.BIproductname}</span>
            </div>
          </>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 1,
      cellClassName: "tableCell",
      renderCell: (params) => {
        return (
          <>
            <div className="listInfoContainer">
              {`${params.row.BIgender}/ ${params.row.BIcategory}`}
            </div>
          </>
        );
      },
    },
    {
      field: "BIqty",
      headerName: "Stock",
      minWidth: 100,
      flex: 1,
      cellClassName: "tableCell",
      renderCell: (params) => {
        return (
          <>
            <span
              className={
                params.row.BIqty >= 100
                  ? "positive"
                  : params.row.BIqty < 100 && params.row.BIqty > 50
                  ? "warning"
                  : "negative"
              }
            >
              {params.row.BIqty}
            </span>
          </>
        );
      },
    },
    {
      field: "BIprice",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
      cellClassName: "tableCell",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      cellClassName: "tableCell",
      renderCell: (params) => {
        return <span className={params.row.status}>{params.row.status}</span>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 180,
      flex: 2,
      cellClassName: "tableCell",
      renderCell: (params) => {
        return (
          <>
            <div className="permsContainer">
              <button className="cta view">
                <p className="text-reset mb-0">View</p>
              </button>
              <button className="cta delete">Delete</button>
            </div>
          </>
        );
      },
    },
  ];
  const product = useSelector((state) => selectProductById(state, productId));
  rows.push(product);
  return (
    <div className="dataTableContainer">
      <div className="titleContainer">
        <p className="title">All Products</p>

        <Link to="/add-product" className="text-reset">
          <button className="cta">Add Product</button>
        </Link>
      </div>
      <div className="gridContainer">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[5]}
          checkboxSelection
          className="dataTable"
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};

export default ProductRows;
