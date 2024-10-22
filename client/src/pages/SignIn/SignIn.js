import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.scss";
import AnimatedRoute from "../../components/AnimatedPage/AnimatedPage";
import signin from "./../../static/signInBg.webp";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../app/slice/authApiSlice";
import { setCredentials } from "../../app/slice/authSlice";
import UsePersist from "../../hooks/UsePersist";
import { CircularProgress } from "@mui/material";

const SignIn = () => {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = UsePersist();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const errClass = errMsg ? "err" : "d-none";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data?.message);
      }
      errRef.current.focus();
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const siError = queryParams.get("siError");

  useEffect(() => {
    if ((username, password)) {
      setErrMsg("");
    }
    if (siError) {
      setErrMsg("Please Sign in To Continue");
    }
  }, [username, password, siError]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <AnimatedRoute>
        <div className="signInPageContainer">
          <div className="left">
            <img src={signin} alt="" className="signInImg" />
          </div>
          <div className="right">
            <div className="formContainer">
              <h2 className="heading">Sign In</h2>
              <span ref={errRef} className={errClass} aria-live="assertive">
                {errMsg}
              </span>
              <form method="post" className="form">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="formInput"
                  value={username}
                  onChange={handleUserInput}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="formInput"
                  value={password}
                  onChange={handlePwdInput}
                />

                <input
                  type="submit"
                  value="SIGN IN"
                  className="cta mt-5"
                  onClick={handleSubmit}
                />
              </form>
              <label htmlFor="persist" className="persistLabel">
                <input
                  type="checkbox"
                  id="persist"
                  className="persistCheckBox me-2"
                  onChange={handleToggle}
                  checked={persist}
                />
                Trust This Device
              </label>
              <span className="link">Forgot Password?</span>
              <span className="link">
                Don't have an account?
                <span className="redirect">
                  <Link to="/signup" className="text-reset">
                    Sign Up!
                  </Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      </AnimatedRoute>
    </>
  );
};

export default SignIn;
