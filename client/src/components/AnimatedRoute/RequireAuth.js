import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { username } = UseAuth();
  const content = username ? (
    <Outlet />
  ) : (
    <Navigate to="/signin?siError=true" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
