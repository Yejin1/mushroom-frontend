//  App.jsx
/**
 * - 최상단 컴포넌트
 * - 라우트 정보 관리
 */
import 'prismjs/themes/prism.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './routes/pages/Login/Login'
import Home from './routes/pages/Home'
import Navbar from './routes/components/Navbar/Navbar';
import ApprovalMain from './routes/features/approval/ApprovalMain';
import WritePopup from './routes/features/approval/popup/WritePopup';
import ReadPopup from './routes/features/approval/popup/ReadPopup';
import Join from './routes/pages/Join/Join'
import BoardMain from './routes/features/board/BoardMain';


function App() {


  const location = useLocation();
  const hideNavbarPath = ['login', '/approval/write', '/approval/read'];
  const hideNavbar = hideNavbarPath.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/board" element={<BoardMain />}></Route>
        <Route path="/approval" element={<ApprovalMain></ApprovalMain>}></Route>
        <Route path="/approval/write" element={<WritePopup></WritePopup>}></Route>
        <Route path="/approval/read" element={<ReadPopup></ReadPopup>}></Route>
      </Routes>
    </div>
  )
}

export default App
