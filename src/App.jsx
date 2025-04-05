import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Login from './routes/login'
import Home from './routes/Home'
import Navbar from "./routes/Navbar"
import ApprovalMain from './routes/approval/ApprovalMain'

function App() {

  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <div className="app-wrapper">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/approval" element={<ApprovalMain></ApprovalMain>}></Route>
      </Routes>
    </div>
  )
}

export default App
