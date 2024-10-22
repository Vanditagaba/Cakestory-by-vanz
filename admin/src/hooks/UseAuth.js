import { useSelector } from "react-redux";
import { selectCurrentToken } from "../app/slice/authSlice";
import jwtDecode from "jwt-decode";

const UseAuth = () => {
  const token = useSelector(selectCurrentToken);
  let checkAdmin = false;

  if (token) {
    const decoded = jwtDecode(token);
    const { username, isAdmin } = decoded.UserInfo;

    checkAdmin = isAdmin;

    return { username, checkAdmin };
  }

  return {
    username: "",
    checkAdmin,
  };
};

export default UseAuth;
