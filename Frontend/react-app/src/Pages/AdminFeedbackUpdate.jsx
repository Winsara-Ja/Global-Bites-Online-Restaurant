    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import './AdminFeedbackUpdate.css'

    function AdminFeedbackUpdate() {
        const { id } = useParams();
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [feedback, setFeedback] = useState('');
        const navigate = useNavigate();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/getFeedback/${id}`);
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setFeedback(response.data.feedback);
                } catch (error) {
                    console.error('Error fetching feedback:', error);
                }
            };

            fetchData();
        }, [id]);

        const handleUpdate = async (e) => {
            e.preventDefault();

            try {
                await axios.put(`http://localhost:5000/updatefeedback/${id}`, { name, email, feedback });
                navigate('/userfeedback');
            } catch (error) {
                console.error('Error updating feedback:', error);
            }
        };

        return (
            <div className="FBAdminbackground">
            <h1 className='FBAdminHead'>Update Feedbacks</h1>
                <div className="container mx-auto">
                    <div className="box">
                        <h2 className="FBupdateHead">Update Feedback Form</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="name" className="FBupdate">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Enter Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="Feedback"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="FBupdate">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Enter Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="Feedback"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="feedback" className="FBupdate">Feedback</label>
                                <input 
                                    type="text" 
                                    id="feedback" 
                                    placeholder="Enter Feedback" 
                                    value={feedback} 
                                    onChange={(e) => setFeedback(e.target.value)} 
                                    className="Feedback"
                                />
                            </div>
                            <button type="submit" className="FBUpdateButton">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    export default AdminFeedbackUpdate;
