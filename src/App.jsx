//  App.jsx
/**
 * - 최상단 컴포넌트
 * - 라우트 정보 관리
 */
import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import Navbar from "./routes/Navbar"
import ApprovalMain from './routes/approval/ApprovalMain'
import WritePopup from './routes/approval/WritePopup'
import ReadPopup from './routes/approval/ReadPopup'

function App() {

  
  const location = useLocation();
  const hideNavbarPath = ['login', '/approval/write'];
  const hideNavbar = hideNavbarPath.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/approval" element={<ApprovalMain></ApprovalMain>}></Route>
        <Route path="/approval/write" element={<WritePopup></WritePopup>}></Route>
        <Route path="/approval/read" element={<ReadPopup></ReadPopup>}></Route>
      </Routes>
    </div>
  )
}

export default App
