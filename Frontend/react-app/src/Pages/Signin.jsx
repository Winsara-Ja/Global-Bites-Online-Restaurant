import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setformData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <>
      {/* <div className='bg-cover bg-[url("/signin.jpeg")] bg-opacity-10 p-20 h-screen'>
        <div className="p-5 max-w-lg mx-auto mb-20 bg-white  rounded-2xl">
          <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
          <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              id="email"
              className="bg-slate-300 p-3 rounded-lg"
            />
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              id="password"
              className="bg-slate-300 p-3 rounded-lg text-slate-800"
            />
            <button
              className="bg-[#f0b20a] bg-600 p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-10 "
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="flex gap-5 mt-5">
            <p>Not have an account?</p>
            <Link to="/signup">
              <span className="text-blue-500">Sign up</span>
            </Link>
          </div>
          <div className="flex gap-5 mt-5">
            <Link to="/forgotpassword">
              <span className="text-blue-500">Forgot password?</span>
            </Link>
          </div>
          <p className="text-red-700 mt-5">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
        </div>
      </div> */}
      <div className="container">
        <div className="user_login">
          <h2>Login To Your Account</h2>
          <form onSubmit={handleSubmit}>
            <p className="p">Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              id="email"
              onChange={handleChange}
            />
            <p className="p">password</p>
            <input
              type="password"
              id="password"
              placeholder="Enter a Password"
              onChange={handleChange}
            />
            <br />
            <Link to="/forgotpassword">
              <p className="trouble">Forgot password?</p>
            </Link>
            <button className="btn" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="signin">-— or Sign in with —-</div>
          <span id="Signinbtn">
            <div id="customBtn">
              <span className="icon"></span>
              <span className="buttonText">Google</span>
            </div>
            <div id="customBtn1">
              <span className="icon1"></span>
              <span className="buttonText1">Facebook</span>
            </div>
          </span>
        </div>
      </div>
      <p className="info">
        Doesn't Have an Account{" "}
        <Link to="/signup">
          <b>Sign Up</b>
        </Link>{" "}
        here
      </p>
    </>
  );
};

export default SignIn;
