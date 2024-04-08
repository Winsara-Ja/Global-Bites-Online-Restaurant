import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function UsersFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getfeedback')
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
      <div className="min-h-screen bg-gray-900">  
        <div className="container p-8 mx-auto">
            <div className="relative overflow-x-auto top-40">
            <h1 className='mb-8 text-4xl font-semibold text-center text-orange-500'>Users Feedbacks</h1>
                <table className="w-full overflow-hidden bg-white rounded-md shadow-md">
                    <thead className="text-xl leading-normal uppercase bg-gray-500 text-gray-950">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Feedback</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-lg font-light text-gray-900">
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-4 text-left whitespace-nowrap">{feedback.name}</td>
                                <td className="px-6 py-4 text-left whitespace-nowrap">{feedback.email}</td>
                                <td className="px-6 py-4 text-left">{feedback.feedback}</td>
                                <td className="px-6 py-4 text-center">
                                <Link to={`/Adminfbupdate/${feedback._id}`} className="inline-block px-4 py-2 mr-2 text-blue-600 transition-colors duration-300 border border-blue-600 rounded-md hover:text-blue-800 hover:border-blue-800">Update</Link>
                                <button onClick={() => handleDelete(feedback._id)} className="inline-block px-4 py-2 text-red-600 transition-colors duration-300 border border-red-600 rounded-md hover:text-red-800 hover:border-red-800">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
        </div>
    );
}

export default UsersFeedback;
