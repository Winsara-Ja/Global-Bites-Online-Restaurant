import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="header">
        <div className="navigation">
          <Link to="/">
            <div className="name">Global Bites</div>
          </Link>
          <nav className="nav">
            <ul>
              <li>
                <a href="/Menu" className="list-item">
                  Menu
                </a>
              </li>
              <li>
                <a href="/Countries" className="list-item">
                  Countries
                </a>
              </li>
              <li>
                <a href="/Locations" className="list-item">
                  Locations
                </a>
              </li>
              <li>
                <a href="/Offers" className="list-item">
                  Offers
                </a>
              </li>
              <li>
                <a href="/contactus" className="list-item">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="btn">
                  Order Catering
                </a>
              </li>
              <li>
                {currentUser && currentUser.isAdmin && (
                  <a className="btn" href="/userMgmt">
                    {" "}
                    User-Management
                  </a>
                )}
              </li>
              <li>
                {currentUser && currentUser.isAdmin && (
                  <a className="btn" href="/history">
                    Login-History
                  </a>
                )}
              </li>
            </ul>
          </nav>
          <div className="head1-items">
            <div className="cart-img">
              <Link to="/cart">
                {currentUser ? (
                  <img src="/cart.png" alt="Cart-Icon" />
                ) : (
                  <ul></ul>
                )}
              </Link>
            </div>
            <div className="cart-img">
              <Link to="/profile">
                {currentUser ? (
                  <img
                    src="/account.png"
                    alt="profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <ul>
                    <a href="/Signin" className="list-item">
                      Sign in
                    </a>
                  </ul>
                )}
              </Link>
            </div>
          </div>
          {/* <div className="text"></div> */}
        </div>
      </div>
    </>
  );
};

export default Header;
