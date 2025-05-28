//  Join.jsx
/**
 * - 회원가입
 */

import React, {useEffect, useState} from "react"
import axios from 'axios'
import './Join.css'

function Join() {

  //input 값
  const [usrNm, setUsrNm] = useState('');
  const [empNo, setEmpNo] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [chkPassword, setChkPassword] = useState('');


  const [chkValid, setChkValid] = useState(false); //가입확인
  const [chkDuplicate, setChkDuplicate] = useState(false); //아이디 중복 확인


  const checkSubscript = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/join/checkSubscript', {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usrNm, empNo}),
      });

      if (!response.ok){
        throw new Error('검증 실패');
      }

      const data = await response.json();

      //일치하는 경우 가입 가능
      if(data.result == 1) setChkValid(true);
      else setChkValid(false);

      alert(data.message);

      //const data = await response.json();

    } catch(error) {
      console.error(error);
      alert('에러');
    }
  };

    const checkDuplicate = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/join/checkDuplicate', {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usrNm, empNo}),
      });

      if (!response.ok){
        throw new Error('검증 실패');
      }

      const data = await response.json();

      //일치하는 경우 가입 가능
      if(data.result == 1) setChkValid(true);
      else setChkValid(false);

      alert(data.message);

      //const data = await response.json();

    } catch(error) {
      console.error(error);
      alert('에러');
    }
  };

  return (
    <div className="login-page">
      <form>
        <div>
          <label className="join-label"
          >이름</label>
          <input 
            className="join-input"
            type="text" 
            value={usrNm}
            onChange={(e) => setUsrNm(e.target.value)}></input>
        </div>
        <div>
          <label className="join-label">사번</label>
          <input 
            className="join-input"
            type="text" 
            value={empNo}
            onChange={(e) => setEmpNo(e.target.value)}></input>
          <span><button type="button" className="mini-button" onClick={checkSubscript}>가입확인</button></span>
        </div>
        <div>
          <label className="join-label">로그인 아이디</label>
          <input 
            className="join-input"
            type="text" 
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}></input>
          <span><button type="button" className="mini-button" onClick={checkSubscript}>중복확인</button></span>
        </div>
        <div>
          <label className="join-label">비밀번호</label>
          <input 
            className="join-input"
            type="text" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label className="join-label">비밀번호 확인</label>
          <input 
            className="join-input"
            type="text" 
            value={chkPassword}
            onChange={(e) => setChkPassword(e.target.value)}></input>
        </div>
        <button className="join-button">가입</button>
      </form>
    </div>
  )
}

export default Join
