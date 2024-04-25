import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
        toast.success("User Created Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container1">
        <div className="user">
          <h1>Create A User Account</h1>
          <form onSubmit={registerUser} className="form">
            <p className="p">UserName</p>
            <input
              type="text"
              className="username"
              placeholder="Enter A Username"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <p className="p">Email</p>
            <input
              type="text"
              className="email"
              placeholder="Enter Your Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <br />
            <p className="p">Password</p>
            <input
              type="password"
              className="password"
              placeholder="Enter Your Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <br />
            <button type="submit" className="btn-register">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
