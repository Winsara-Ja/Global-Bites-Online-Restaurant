import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { resetPassword } from '../redux/auth/authActions';
import { resetForgotPasswordStatus, resetResetStatus } from '../redux/user/userSlice'; // Import the new action creators

const ResetPassword = () => {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    if (token) {
      setResetToken(token);
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password must contain at least 8 characters, including at least one letter, one number, and one special character.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');


    const success = await dispatch(resetPassword({ resetToken, newPassword }));
    setResetStatus(success ? 'success' : 'error');
  };

  const handleSignInClick = () => {
    // Reset both resetStatus and forgotPasswordStatus to null
    setResetStatus(null);
    dispatch(resetForgotPasswordStatus());
    dispatch(resetResetStatus());
  };

  return (
    <><div className='bg-cover bg-[url("/signin.jpeg")] bg-opacity-10 p-20 h-screen'>
      <div className='p-5 max-w-lg mx-auto mb-20 bg-white  rounded-2xl'>
        <h1 className='text-3xl text-center font-semibold my-7'>Reset Password</h1>
        <div>
          <form className=' flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <input type="password" name="newPassword" placeholder="New Password" value={newPassword} onChange={handleChange} className='bg-slate-300 p-3 rounded-lg' />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} className='bg-slate-300 p-3 rounded-lg' />
            {passwordError && <p className="text-red-600">{passwordError}</p>}
            <button className='bg-[#f0b20a] bg-600 p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-10 ' type="submit">Reset Password</button>
          </form>
          {resetStatus === 'success' && (
            <p className="text-green-600">Password reset successful. Please <Link className="text-blue-600" to="/signin" onClick={handleSignInClick}>sign in</Link>.</p>
          )}
          {resetStatus === 'error' && (
            <p className="text-red-600">Password reset failed. Please try again.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
