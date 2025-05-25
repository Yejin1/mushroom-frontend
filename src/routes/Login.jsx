import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate, redirect} from 'react-router-dom'
import React, {useState} from 'react'
import './Login.css'


function Login() {

  let navigate = useNavigate();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      });

      if (!response.ok){
        throw new Error('로그인 실패');
      }
      
      const data = await response.json();
      const token = data.token;

      localStorage.setItem('accesToken', token);

      alert('로그인 성공');
      navigate("/approval");

    } catch(error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img src={'/main_mushroom1.png'} className="login-mushroom"/>
        <h1 className="title"> <span className="title-mushroom">버섯상사</span> 전자결재</h1>
        <div>
          <input 
            type="text" 
            placeholder='아이디' 
            className="login-input" 
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            />
          <input 
            type="text" 
            placeholder='비밀번호' 
            className="login-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
          <button className='login-button' onClick={handleLogin}> 로그인</button>
        </div>
      </div>
    </div>
  )
}

export default Login
