import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './routes/login'
import Home from './routes/Home'

function App() {

  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
