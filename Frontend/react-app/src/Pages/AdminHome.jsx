import React from "react";
import "./AdminHome.css";
import { manager_list } from "../assets/assets";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ManagerHeader from "../Pages/Managers/ManagerHeader";

const AdminHome = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {currentUser.isAdmin ? (
        <>
          <ManagerHeader />
          <div className="manager-list">
            {manager_list.map((manager, index) => (
              <Link
                to={`/manager/${manager.route}`}
                key={index}
                className="list-manager"
              >
                <img
                  className="manager-img"
                  src={manager.image}
                  alt="manager-flag"
                />
                <p className="manager-name">{manager.name}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="notAthorized">Not Athorized</h1>
        </>
      )}
    </>
  );
};

export default AdminHome;
