import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AccessibilityPanel from './components/AccessibilityPanel'


function App() {

  return (
    <>
    <AccessibilityPanel />
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password"  element={<ResetPasswordPage />} />
  
      <Route path='/' element= {
        <PrivateRoute>
            <HomePage />
        </PrivateRoute>
      }
      />
      <Route path="/profil" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    </Routes>
    </>
  )
}

export default App
