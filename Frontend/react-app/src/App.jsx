import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Home.jsx";
import { UserContextProvider } from "../context/userContext.jsx";
import { Toaster } from "react-hot-toast";
import Cart from "./Pages/Cart.jsx";
import Order from "./Pages/Order.jsx";
import AddItems from "./Pages/Menu-Management/AddItems";
import DisplayMenu from "./Pages/Menu-Management/DisplayMenu";
import EditItems from "./Pages/Menu-Management/EditItems";
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
import Menu from "./Pages/Menu.jsx";
import OrderDashboard from "./Pages/Managers/OrderDashboard.jsx";
import MenuandOffer from "./Pages/Managers/MenuandOffer.jsx";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import History from "./Pages/SigninHistory";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import UserManagement from "./Pages/UserManagement";
import UserDashboard from "./Pages/Managers/UserDashboard.jsx";
import CreateFeedback from "./Pages/CreateFeedback";
import UpdateFeedback from "./Pages/UpdateFeedback";
import ContactUs from "./Pages/ContactUs";
import UsersFeedback from "./Pages/UsersFeedback.jsx";
import FeedbackList from "./Pages/feedbacklist";
import AdminFeedbackUpdate from "./Pages/AdminFeedbackUpdate";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster position="top-left" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/history" element={<History />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/userMgmt" element={<UserManagement />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/addItems" element={<AddItems />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/manageMenu" element={<DisplayMenu />} />
        <Route path="/updateMenu/:id" element={<EditItems />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/addOffers" element={<AddOffers />} />
        <Route path="/manageOffer" element={<DisplayOffers />} />
        <Route path="/updateOffers/:id" element={<EditOffers />} />
        <Route path="/SriLanka" element={<SriLanka />}></Route>
        <Route path="/Thailand" element={<Thailand />}></Route>
        <Route path="/SouthKorea" element={<SouthKorea />}></Route>
        <Route path="/Italy" element={<Italy />}></Route>
        <Route path="/Spain" element={<Spain />}></Route>
        <Route path="/adminHome" element={<AdminHome />}></Route>
        <Route
          path="/manager/userdashboard"
          element={<UserDashboard />}
        ></Route>
        <Route path="/manager/menuDashboard" element={<MenuandOffer />}></Route>
        <Route
          path="/manager/orderdashboard"
          element={<OrderDashboard />}
        ></Route>
        <Route path="/userfeedback" element={<UsersFeedback />}></Route>
        <Route path="/createfeedback" element={<CreateFeedback />}></Route>
        <Route path="/updatefeedback/:id" element={<UpdateFeedback />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/fblist" element={<FeedbackList />}></Route>
        <Route
          path="/Adminfbupdate/:id"
          element={<AdminFeedbackUpdate />}
        ></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
