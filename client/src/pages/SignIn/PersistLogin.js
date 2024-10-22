import { Outlet, Link, useLocation } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useRefreshMutation } from "../../app/slice/authApiSlice";
import usePersist from "../../hooks/UsePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../app/slice/authSlice";

const PersistLogin = () => {
  const location = useLocation();

  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = (
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"92vh"}
          animation="wave"
        />
      </Stack>
    );
  } else if (isError) {
    if (location.pathname === "/profile") {
      return (content = (
        <p className="err">
          {error.data?.message} <Link to="/">Please Login Again</Link>
        </p>
      ));
    }
    content = <Outlet />;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
