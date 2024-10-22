import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signIn.scss";
import AnimatedPage from "./../../components/AnimatedPage/AnimatedPage";
import InputField from "../../components/InputField/InputField";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../app/slice/authApiSlice";
import { setCredentials } from "../../app/slice/authSlice";
import UsePersist from "../../hooks/UsePersist";

const SignIn = () => {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = UsePersist();

  const handleUserInput = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
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
      setUserName("");
      setPassword("");
      navigate("/dashboard");
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

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <AnimatedPage>
        <div className="signInContainer">
          <div className="left"></div>
          <div className="right">
            <div className="formContainer">
              <h2 className="title">CAKESTORY</h2>
              <span className="subTitle">Admin Login</span>
              <span ref={errRef} className={errClass} aria-live="assertive">
                {errMsg}
              </span>
              <form method="post" className="form">
                <InputField
                  type="text"
                  label="User name"
                  name="uname"
                  fieldType="input"
                  value={username}
                  onChange={handleUserInput}
                />
                <InputField
                  type="password"
                  name="password"
                  label="Password"
                  fieldType="input"
                  value={password}
                  onChange={handlePasswordInput}
                />

                <div className="bottom">
                  <span className="link">Forgot Password?</span>

                  <input
                    type="submit"
                    value="Sign In"
                    className="cta"
                    onClick={handleSubmit}
                  />
                </div>
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
              </form>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default SignIn;
