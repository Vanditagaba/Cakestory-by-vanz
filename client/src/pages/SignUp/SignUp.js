import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.scss";
import AnimatedRoute from "./../../components/AnimatedPage/AnimatedPage";
import signup from "./../../static/signup-bg.jpg";
import { useAddNewUserMutation } from "../../app/slice/usersApiSlice";

const SignUp = () => {
  const navigate = useNavigate("/");
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [addNewUser] = useAddNewUserMutation();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
  });
  const errClass = errMsg ? "err" : "d-none";
  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewUser({ ...data }).unwrap();
      setData({
        fname: "",
        lname: "",
        email: "",
        username: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Fields");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data?.message);
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      <AnimatedRoute>
        <div className="signUpContainer">
          <div className="left">
            <img src={signup} alt="" className="signUpImg" />
          </div>
          <div className="right">
            <div className="formContainer">
              <h2 className="heading">Sign Up</h2>
              <span ref={errRef} className={errClass} aria-live="assertive">
                {errMsg}
              </span>
              <form method="post" className="form">
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  className="formInput"
                  value={data.fname}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  className="formInput"
                  value={data.lname}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="formInput"
                  value={data.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="formInput"
                  value={data.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="formInput"
                  value={data.password}
                  onChange={handleChange}
                />

                <input
                  type="submit"
                  value="SIGN UP"
                  className="cta mt-5"
                  onClick={handleSubmit}
                />
              </form>

              <span className="link">
                Already have an account?
                <span className="redirect">
                  <Link to="/signin" className="text-reset">
                    Sign In!
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

export default SignUp;
