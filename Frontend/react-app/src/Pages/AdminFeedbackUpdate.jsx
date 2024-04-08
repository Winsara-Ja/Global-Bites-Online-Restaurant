    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import axios from 'axios';

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
                navigate('/');
            } catch (error) {
                console.error('Error updating feedback:', error);
            }
        };

        return (
            <div className="min-h-screen bg-gray-900"> {/* Apply bg-gray-900 and min-h-screen to ensure it covers the entire page */}
            <h1 className='mb-3 text-3xl font-bold text-center text-orange-500'>Update Feedbacks</h1>
                <div className="container mx-auto">
                    <div className="max-w-lg p-8 mx-auto bg-gray-800 rounded-lg shadow-md">
                        <h2 className="mb-4 text-2xl font-semibold text-center">Update Feedback Form</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Enter Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Enter Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
                                <input 
                                    type="text" 
                                    id="feedback" 
                                    placeholder="Enter Feedback" 
                                    value={feedback} 
                                    onChange={(e) => setFeedback(e.target.value)} 
                                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button type="submit" className="px-4 py-2 text-white bg-orange-600 rounded hover:bg-blue-600">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    export default AdminFeedbackUpdate;
