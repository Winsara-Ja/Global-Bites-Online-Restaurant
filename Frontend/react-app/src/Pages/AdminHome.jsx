import React from 'react'
import './AdminHome.css'
import { manager_list } from "../assets/assets"
import { Link } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div className="manager-list">
      {manager_list.map((manager, index) => (
        <Link to={`/manager/${manager.id}`} key={index} className="list-manager">
          <img
            className="manager-img"
            src={manager.image}
            alt="manager-flag"
          />
          <p className="manager-name">{manager.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default AdminHome