import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ordersApiSlice } from "./slice/ordersApiSlice";
import { productsApiSlice } from "./slice/productsApiSlice";
import { usersApiSlice } from "./slice/usersApiSlice";
import { store } from "./store";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");

    const products = store.dispatch(
      productsApiSlice.endpoints.getProducts.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const orders = store.dispatch(
      ordersApiSlice.endpoints.getOrders.initiate()
    );

    return () => {
      console.log("unsubscribing");
      products.unsubscribe();
      users.unsubscribe();
      orders.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
