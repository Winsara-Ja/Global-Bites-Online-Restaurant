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
import UsersFeedback from './Pages/UsersFeedback'
import CreateFeedback from './Pages/CreateFeedback'
import UpdateFeedback from './Pages/UpdateFeedback'
import ContactUs from './Pages/ContactUs';
import FeedbackList from './Pages/feedbacklist'
import AdminFeedbackUpdate from './Pages/AdminFeedbackUpdate'

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
        <Route path='/getfeedback' element={<UsersFeedback/>}></Route>
        <Route path='/createfeedback' element={<CreateFeedback/>}></Route>
        <Route path='/updatefeedback/:id' element={<UpdateFeedback/>}></Route>
        <Route path='/contactus' element={<ContactUs/>}></Route>
        <Route path='/fblist' element={<FeedbackList/>}></Route>
        <Route path='/Adminfbupdate/:id' element={<AdminFeedbackUpdate/>}></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
