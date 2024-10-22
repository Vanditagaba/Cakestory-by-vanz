import React from "react";
import { useSelector } from "react-redux";
import { useDeleteProductMutation } from "../../app/slice/productsApiSlice";
import {
  useDeleteUserMutation,
  selectUserById,
} from "../../app/slice/usersApiSlice";

const Delete = ({ id, product }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteUser] = useDeleteUserMutation();
  const user = useSelector((state) => selectUserById(state, id));
  const onDeleteProductClicked = async () => {
    try {
      await deleteProduct({ id }).unwrap();
      window.location.reload(true);
    } catch (err) {
      console.error("Failed to delete the Product", err);
    }
  };
  const onDeleteUserClicked = async () => {
    if (user.id === id) {
      return window.alert("You are trying to delete your own account!");
    }
    try {
      await deleteUser({ id }).unwrap();
      window.location.reload(true);
    } catch (err) {
      console.error("Failed to delete the User", err);
    }
  };
  return (
    <button
      className="cta delete"
      onClick={product === true ? onDeleteProductClicked : onDeleteUserClicked}
    >
      Delete
    </button>
  );
};

export default Delete;
