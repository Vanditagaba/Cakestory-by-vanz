import * as React from "react";
import UseAuth from "../../hooks/UseAuth";
import Box from "@mui/material/Box";
import "./orders.scss";
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
} from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  selectOrderById,
  useGetOrdersQuery,
} from "../../app/slice/ordersApiSlice";
import { selectProductById } from "../../app/slice/productsApiSlice";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const rows = useSelector((state) => selectOrderById(state, row));
  const rowProduct = rows.product ? JSON.parse(rows.product) : [];

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ borderBottom: "1px solid #060606", fontSize: "14px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{ borderBottom: "1px solid #060606", fontSize: "14px" }}
          component="th"
          scope="row"
          align="center"
        >
          {rows.id}
        </TableCell>
        <TableCell
          sx={{ borderBottom: "1px solid #060606", fontSize: "14px" }}
          align="center"
        >
          {rows.email}
        </TableCell>
        <TableCell
          sx={{ borderBottom: "1px solid #060606", fontSize: "14px" }}
          align="center"
        >
          {rows.stripeSessionId}
        </TableCell>
        <TableCell
          sx={{ borderBottom: "1px solid #060606", fontSize: "14px" }}
          align="center"
        >
          {format(new Date(rows.createdAt), "dd MMMM yyyy 'at' hh:mm b")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
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
                    <TableRow key={productRow.id}>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #060606",
                          fontSize: "13px",
                        }}
                        align="left"
                      >
                        {productRow.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #060606",
                          fontSize: "13px",
                        }}
                        component="th"
                        scope="row"
                      >
                        <GetProduct productId={productRow.id} />
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #060606",
                          fontSize: "13px",
                        }}
                      >
                        {productRow.qty}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #060606",
                          fontSize: "13px",
                        }}
                      >
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

const Orders = () => {
  const { userId } = UseAuth();
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery(userId);

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
      <Box sx={{ width: "80%", margin: "100px auto" }}>
        <Typography sx={{ marginBottom: "30px" }} variant="h4">
          RECENT ORDERS
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#e7e7e7", border: "1px solid #060606" }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "1px solid #060606" }} />
                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #060606", fontSize: "16px" }}
                >
                  Order ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #060606", fontSize: "16px" }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #060606", fontSize: "16px" }}
                >
                  Session ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "1px solid #060606", fontSize: "16px" }}
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ids.map((order) => (
                <Row key={order.name} row={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  if (isError) {
    return <p>Error: {error?.data?.message}</p>;
  }
};

export default Orders;
