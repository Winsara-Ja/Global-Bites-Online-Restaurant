import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { StyleSheet } from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import "./history.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
  },
  actionCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    textAlign: 'center',
  },
});

const PAGE_SIZE = 20;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(" http://localhost:3000/api/user/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = (user) => {
    setEditingUser(user);
    console.log(editingUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/user/updateone/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      setEditingUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) {
        return;
      }
      if (id === currentUser._id) {
        window.alert("Cannot delete the currently logged-in admin account");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/user/deleteone/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUser }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginatedUsers = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      <div className="card">
        <div className="cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h1 className="h1">
                  <b>User Management</b>
                </h1>
              </div>
            </div>
            {editingUser ? ( // Render the form if editingUser is not null
              <div className='bg-cover bg-[url("/profile.jpeg")]  p-8 h- min-h-screen'>
                <div className='p-3 max-w-lg mx-auto bg-white rounded-2xl'>
                  <h1 className='text-3xl font-semibold text-center my-7'>Update user</h1>
                  <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                    <input
                      type="text"
                      id='username'
                      placeholder='Username'
                      value={editingUser.username}
                      onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                      className='bg-slate-100 rounded-lg p-3'
                    />
                    <input
                      type="text"
                      id='address'
                      placeholder='Address'
                      value={editingUser.address}
                      onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                      className='bg-slate-100 rounded-lg p-3'
                    />
                    <input
                      type="email"
                      id='email'
                      placeholder='Email'
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className='bg-slate-100 rounded-lg p-3'
                    />
                    <button className='bg-[#f0b20a] bg-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                      {'Update'}
                    </button>
                  </form>

                </div>
              </div>
            ) : (
              <table id="history">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td className="flex space-x-2">
                        <button onClick={() => { handleUpdateUser(user) }} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Update</button>
                        <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex justify-center">
              <button onClick={prevPage} disabled={currentPage === 1} className="bg-green-500 text-white py-1 px-4 rounded mr-2 w-30 h-9">
                &lt;&lt; Previous
              </button>
              <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-green-500 text-white py-1 px-4 rounded w-30 h-9">
                Next &gt;&gt;
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
