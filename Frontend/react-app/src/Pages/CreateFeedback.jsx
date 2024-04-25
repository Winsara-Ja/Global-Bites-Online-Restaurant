import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateFeedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/createfeedback", { name, email, feedback })
            .then(result => {
                console.log(result);
                navigate('/fblist');
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2 >Add Feedback</h2>
                    <div class>
                        <label htmlFor="">Name</label>
                        <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Feedback</label>
                        <input type='text' placeholder='Enter Feedback' onChange={(e) => setFeedback(e.target.value)} />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}