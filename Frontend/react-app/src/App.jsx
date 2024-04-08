import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import { UserContextProvider } from "../context/userContext.jsx";
import { Toaster } from "react-hot-toast";
import Menu from "./Pages/Menu.jsx";
import Cart from "./Pages/Cart.jsx";
import Order from "./Pages/Order.jsx";
import AddService from './Pages/addservice';
import Servicedetails from './Pages/servicedetails';
import UpdateService from './Pages/update_service';
import Header from './Pages/header';

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster position="top-left" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path='/catering' element={<AddService/>}></Route>
<Route path='/catering/details' element={<Servicedetails/>}></Route>
<Route path='/update_service/:id' element={<UpdateService/>}></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
