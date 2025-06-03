//  Login.jsx
/**
 * - 로그인화면
 */
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, redirect } from 'react-router-dom'
import React, { useState } from 'react'
import styles from './Login.module.css'


function Login() {

  let navigate = useNavigate();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const join = () => {
    navigate('/join');
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const data = await response.json();
      //로그인 토큰 저장
      const token = data.token;
      localStorage.setItem('accesToken', token);

      navigate("/approval");

    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-box']}>
        <img src={'/main_mushroom1.png'} className={styles['login-mushroom']} />
        <h1 className={styles['title']}> <span className={styles['title-mushroom']}>버섯상사</span> 전자결재</h1>
        <div>
          <input
            type="text"
            placeholder='아이디'
            className={styles['login-input']}
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            type="password"
            placeholder='비밀번호'
            className={styles['login-input']}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className={styles['login-button']} onClick={handleLogin}> 로그인</button>
        </div>
        <div>
          <button className={styles['login-']} onClick={join}> 회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Login
