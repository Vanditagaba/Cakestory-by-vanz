import React from "react";
import { useSelector } from "react-redux";
import {
  selectOrderById,
  useGetOrdersQuery,
} from "../../app/slice/ordersApiSlice";
import { selectProductById } from "../../app/slice/productsApiSlice";
import { format } from "date-fns";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Skeleton,
  Stack,
  Box,
} from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "./simpleTable.scss";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const rows = useSelector((state) => selectOrderById(state, row));
  const rowProduct = rows.product ? JSON.parse(rows.product) : [];

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "1px solid #292a32",
            fontSize: "13px",
            color: "#e8e8e8",
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "#9474ed", fontSize: "14px" }}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {rows.id}
        </TableCell>
        <TableCell align="center">{rows.email}</TableCell>
        <TableCell align="center">{rows.stripeSessionId}</TableCell>
        <TableCell align="center">
          {format(new Date(rows.createdAt), "dd MMMM yyyy 'at' hh:mm b")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: "#292a32" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "#e8e8e8" }}
              >
                Order
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow
                    sx={{
                      "& > *": {
                        borderBottom: "1px solid #292a32",
                        fontSize: "12px",
                        color: "#e8e8e8",
                      },
                    }}
                  >
                    <TableCell sx={{ fontSize: "13px" }}>Product ID</TableCell>
                    <TableCell sx={{ fontSize: "13px" }}>Product</TableCell>
                    <TableCell align="left" sx={{ fontSize: "13px" }}>
                      Quantity
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "13px" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowProduct.map((productRow) => (
                    <TableRow
                      key={productRow.id}
                      sx={{
                        "& > *": {
                          borderBottom: "1px solid #292a32",
                          fontSize: "13px",
                          color: "#e8e8e8",
                        },
                      }}
                    >
                      <TableCell align="left">{productRow.id}</TableCell>
                      <TableCell component="th" scope="row">
                        <GetProduct productId={productRow.id} />
                      </TableCell>
                      <TableCell>{productRow.qty}</TableCell>
                      <TableCell>
                        {rows.completed ? (
                          <p>Payment Successful</p>
                        ) : (
                          <p>Payment Unsuccessful</p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const GetProduct = ({ productId }) => {
  const product = useSelector((state) => selectProductById(state, productId));
  if (!product) {
    return "no product found";
  }
  return (
    <div className="orderSub">
      <img src={product.img[0]} alt="" className="productImg" />
      <span>{product.BIproductname}</span>
    </div>
  );
};

const SimpleTable = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          sx={{ margin: "100px auto" }}
          width={"80%"}
          height={"50vh"}
          animation="wave"
        />
      </Stack>
    );
  }

  if (isSuccess) {
    const { ids } = orders;
    const sliceIds = ids.slice(0, 7);
    if (!ids?.length) {
      return (
        <>
          <Box
            sx={{ width: "80%", margin: "100px auto", height: "50vh" }}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <p>No Orders Found</p>
          </Box>
        </>
      );
    }
    return (
      <>
        <div className="tableContainer">
          <p className="title">Latest Orders</p>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#1e1f25",
            }}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow
                  sx={{
                    "& > *": {
                      borderBottom: "1px solid #292a32",
                      fontSize: "16px",
                      color: "#e8e8e8",
                    },
                  }}
                >
                  <TableCell />
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Session ID</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sliceIds.map((order) => (
                  <Row key={order.name} row={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
  if (isError) {
    return <p>Error: {error?.data?.message}</p>;
  }
};

export default SimpleTable;
