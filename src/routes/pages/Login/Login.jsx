//  Login.jsx
/**
 * - 로그인화면
 */
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import styles from './Login.module.css'


function Login() {

  let navigate = useNavigate();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const join = () => {
    navigate('/join');
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
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
      localStorage.setItem('empNo', data.empNo); // 사번 저장

      navigate("/approval");

    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  const handleVisitorLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId: 'aaa', password: 'qlqjs123!' }),
      });

      if (!response.ok) {
        throw new Error('방문자 로그인 실패');
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem('accesToken', token);
      localStorage.setItem('empNo', data.empNo); // 사번 저장

      navigate("/approval");
    } catch (error) {
      console.error(error);
      alert('방문자 로그인 실패');
    }
  };


  return (
    <div className={styles['login-page']}>
      <div className={styles['login-box']}>
        <img src={'/main_mushroom1.png'} className={styles['login-mushroom']} />
        <h1 className={styles['title']}>
          <span className={styles['title-mushroom']}>버섯상사</span> 전자결재
        </h1>
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
          <button className={styles['login-join-button']} onClick={join}>회원가입</button>
          <span className={styles['login-divider']} aria-hidden="true">|</span>
          <button
            className={styles['login-find-button']}
            onClick={() => alert('준비중입니다.')}
            type="button"
          >
            아이디/비밀번호 찾기
          </button>
        </div>
        {/* 방문자용 로그인 버튼을 login-box 내부로 이동 */}
        <div className={styles['visitor-login-wrap']}>
          <button
            className={styles['visitor-login-button']}
            onClick={handleVisitorLogin}
            type="button"
          >
            방문자용 로그인
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
