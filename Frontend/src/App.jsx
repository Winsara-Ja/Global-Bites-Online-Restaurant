import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import History from './pages/SigninHistory'
import PrivateRoute from './components/PrivateRoute'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import UserManagement from './pages/UserManagement'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/signin' Component={Signin} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/history' Component={History} />
        <Route path='/resetpassword' Component={ResetPassword} />
        <Route path='/forgotpassword' Component={ForgotPassword} />
        <Route path='/userMgmt' Component={UserManagement} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App