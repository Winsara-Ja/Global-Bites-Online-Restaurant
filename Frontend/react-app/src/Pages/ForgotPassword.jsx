import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/auth/authActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const forgotPasswordStatus = useSelector(
    (state) => state.user.forgotPasswordStatus
  );

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <>
      <div className='bg-cover bg-[url("/signin.jpeg")] bg-opacity-10 p-20 h-screen'>
        <div className="p-5 max-w-lg mx-auto mb-20 bg-white  rounded-2xl">
          <h1 className="text-3xl text-center font-semibold my-7">
            Forgot Password
          </h1>
          <div>
            <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                className="bg-slate-300 p-3 rounded-lg"
              />
              <button
                className="bg-[#f0b20a] bg-600 p-3 rounded-lg w-full text-white uppercase hover:opacity-85 disabled:opacity-10 "
                type="submit"
              >
                Reset Password
              </button>
            </form>
          </div>
          {forgotPasswordStatus === "success" && (
            <p className="text-green-600">
              Password reset link is sent to your email. Please check your
              email.
            </p>
          )}
          {forgotPasswordStatus === "error" && (
            <p className="text-red-600">
              Failed to send reset password link to the email
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
