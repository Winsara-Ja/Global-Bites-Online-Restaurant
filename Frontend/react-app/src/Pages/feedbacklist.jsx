import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UsersFeedback() {
    const memberId = '660c0aaf94d17839726211ab';
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/createfeedback", { name, email, feedback })
          .then(result => {
            console.log(result);
            Swal.fire({
              title: "Good job!",
              text: "comment submitted successfully!",
              icon: "success"
            }).then(() => {
              navigate('/fblist');
              window.location.reload();
            });
          })
          .catch(err => console.log(err));
      };

    useEffect(() => {
        axios.get('http://localhost:5000')
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
                  text: "Your file has been deleted.",
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


    // Filter feedbacks based on search query
    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto bg-gray-900" >
            <h1 className="text-xl font-bold text-white ">{filteredFeedbacks.length} Comments</h1>
            <input
            type="text"
            placeholder="Search comments by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 mt-4 mb-8 text-white bg-gray-800 border border-gray-300 rounded " // Added w-full to make it full-width
            />

<div className="flex flex-col space-y-4">
    {filteredFeedbacks.map((feedback, index) => (
        <div key={feedback._id} className={`p-6 rounded-lg shadow-md ${feedback._id === memberId ? 'bg-orange-500' : 'bg-gray-900'} border-2 border-orange-500 ${index !== filteredFeedbacks.length - 1 ? 'mb-4' : ''}`}>
            <div className="flex items-center"> {/* Add flex container */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>

                <h3 className="text-xl font-semibold text-white">{feedback.name}</h3>
            </div>
            <p className="text-white">Email: {feedback.email}</p>
            <p className="text-white">Feedback: {feedback.feedback}</p>
            <div className="mt-4">
                {feedback._id === memberId && ( // Conditionally render buttons
                    <>
<Link to={`/updatefeedback/${feedback._id}`} className="inline-block px-4 py-2 mr-2 text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white">
    Update
</Link>
<button onClick={() => handleDelete(feedback._id)} className="inline-block px-4 py-2 text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white">
    Delete
</button>

                    </>
                )}
            </div>
        </div>
    ))}
</div>

            <div className="mt-8">
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4 text-xl text-white">Add Comment</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type='text'
                            id="name"
                            placeholder='Enter Name'
                            className="w-full px-3 py-2 mt-1 text-white bg-gray-800 border rounded"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type='email'
                            id="email"
                            placeholder='Enter Email'
                            className="w-full px-3 py-2 mt-1 text-white bg-gray-800 border rounded"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='feedback' className="block text-gray-700">Feedback</label>
                        <input
                            type='text'
                            id="feedback"
                            placeholder='Enter Feedback'
                            className="w-full px-3 py-2 mt-1 text-white bg-gray-800 border rounded"
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UsersFeedback;
