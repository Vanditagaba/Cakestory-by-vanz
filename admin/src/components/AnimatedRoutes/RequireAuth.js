import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { checkAdmin } = UseAuth();
  const content = checkAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
