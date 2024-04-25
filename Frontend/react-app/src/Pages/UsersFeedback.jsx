import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import './UsersFeedback.css'

function UsersFeedback() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [feedbacks, setFeedbacks] = useState([]);
    const userId = currentUser._id

    useEffect(() => {
        axios.get("http://localhost:5000/getUserFeedback/" + userId)
            .then(result => setFeedbacks(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            // Perform deletion if user confirms
            axios.delete(`http://localhost:5000/deleteFeedback/${id}`)
              .then(res => {
                Swal.fire({
                  title: "Deleted!",
                  text: "comment has been deleted.",
                  icon: "success"
                }).then(() => {
                  window.location.reload();
                });
              })
              .catch(err => {
                console.error("Error deleting feedback:", err);
                Swal.fire({
                  title: "Error!",
                  text: "Failed to delete feedback.",
                  icon: "error"
                });
              });
          }
        });
      };

    return (
        <>
        <Header/>
      <div className="FBUser">
        <div className="FBnew">
            <div className="FBdesign">
            <h1 className='UserFB'>Users Feedbacks</h1>
                <table className="FBtable">
                    <thead className="FBHead">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Feedback</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="FBbody">
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id} className="FBtableRow">
                                <td className="tablecell">{feedback.name}</td>
                                <td className="tablecell">{feedback.email}</td>
                                <td className="tablecell">{feedback.feedback}</td>
                                <td className="tablecell1">
                                <Link to={`/Adminfbupdate/${feedback._id}`} className="FBlink">Update</Link>
                                <button onClick={() => handleDelete(feedback._id)} className="FBlink1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
        </div>
        <Footer/>
        </>
    );
}

export default UsersFeedback;
