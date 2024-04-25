import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import './feedbacklist.css'

function UsersFeedback() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    const userId = currentUser._id;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/createfeedback", { name, userId, email, feedback })
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

    <>
    <Header/>
<div className='empty'></div>
      <div className='FBlistbackground'>
        <div className="FBpage">
        <div className='myfeedback-btn'>
  <Link to="/userfeedback">
  <button className='myfeed-btn'>My FeedBacks</button>
  </Link>
</div>
            <h1 className="FBtitlet">Feedback</h1>

            <div className="mt-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="FBName">Name</label>
                        <input
                            type='text'
                            id="name"
                            placeholder='Enter Name'
                            className="FBlist"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="FBEmail">Email</label>
                        <input
                            type='email'
                            id="email"
                            placeholder='Enter Email'
                            className="FBlist"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='feedback' className="FBtext">Feedback</label>
                        <input
                            type='text'
                            id="feedback"
                            placeholder='Enter Feedback'
                            className="FBlist"
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>
                    <div className='FBbtn'>
                    <button
                        type='submit'
                        className="FeedbackButton">
                        Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
        <h2 className='FBcomment'>{filteredFeedbacks.length} Comments</h2>
            <input
            type="text"
            placeholder="Search comments by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="FBbox" // Added w-full to make it full-width
            />
        <div className="flex flex-col space-y-4">
    {filteredFeedbacks.map((feedback, index) => (
        <div className='feedback'>
            <div className="flex items-center"> {/* Add flex container */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange" className="FBlistIcon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>

                <h3 className="FBlistName">{feedback.name}</h3>
            </div>
            <p className="text-white">Email: {feedback.email}</p>
            <p className="text-white">Feedback: {feedback.feedback}</p>
            {/* <div className="mt-4">
                {feedback._id === memberId && ( // Conditionally render buttons
                    <>
<Link to={`/updatefeedback/${feedback._id}`} className="FBbutton">
    Update
</Link>
<button onClick={() => handleDelete(feedback._id)} className="FBbutton2">
    Delete
</button>

                    </>
                )}
            </div> */}
        </div>
    ))}
</div>
      </div>
      <Footer/>
    </>  
    );
}

export default UsersFeedback;
