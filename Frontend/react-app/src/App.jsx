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
import AddItems from './Pages/Menu-Management/AddItems';
import DisplayMenu from './Pages/Menu-Management/DisplayMenu'
import EditItems from './Pages/Menu-Management/EditItems';
import AddOffers from "./Pages/Offer-Management/AddOffers.jsx";
import DisplayOffers from "./Pages/Offer-Management/DisplayOffers.jsx";
import Offers from "./Pages/Offers.jsx";
import EditOffers from "./Pages/Offer-Management/EditOffers.jsx";
import SriLanka from "./Pages/Countries/SriLanka.jsx";
import Thailand from "./Pages/Countries/Thailand.jsx";
import SouthKorea from "./Pages/Countries/SouthKorea.jsx";
import Italy from "./Pages/Countries/Italy.jsx";
import Spain from "./Pages/Countries/Spain.jsx";
import AdminHome from "./Pages/AdminHome.jsx";

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
        <Route path="/addItems" element={<AddItems />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/manager/5" element={<DisplayMenu/>} />
        <Route path="/updateMenu/:id" element={<EditItems/>} />
        <Route path="/Offers" element={<Offers/>} />
        <Route path="/addOffers" element={<AddOffers/>} />
        <Route path="/manager/7" element={<DisplayOffers/>} />
        <Route path="/updateOffers/:id" element={<EditOffers />} />
        <Route path="/SriLanka" element={<SriLanka/>}></Route>
        <Route path="/Thailand" element={<Thailand/>}></Route>
        <Route path="/SouthKorea" element={<SouthKorea/>}></Route>
        <Route path="/Italy" element={<Italy/>}></Route>
        <Route path="/Spain" element={<Spain/>}></Route>
        <Route path="/adminHome" element={<AdminHome/>}></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
