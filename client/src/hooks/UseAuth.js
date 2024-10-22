import { useSelector } from "react-redux";
import { selectCurrentToken } from "../app/slice/authSlice";
import jwtDecode from "jwt-decode";

const UseAuth = () => {
  const token = useSelector(selectCurrentToken);
  let checkAdmin = false;
  let userId = "";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, isAdmin, id } = decoded.UserInfo;
    checkAdmin = isAdmin;
    userId = id;

    return { username, checkAdmin, userId };
  }

  return {
    username: "",
    checkAdmin,
  };
};

export default UseAuth;
