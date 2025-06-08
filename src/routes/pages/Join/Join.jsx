//  Join.jsx
/**
 * - 회원가입
 */

import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import styles from './Join.module.css'

function Join() {

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //input 값
  const [usrNm, setUsrNm] = useState('');
  const [empNo, setEmpNo] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


  const [chkValid, setChkValid] = useState(false); //가입확인
  const [chkDuplicate, setChkDuplicate] = useState(false); //아이디 중복 확인
  const [chkSamePwd, setChkSamePwd] = useState(false); //비밀번호 일치 여부
  const [pwdLabel, setPwdLabel] = useState(''); //비밀번호 일치 여부 문구
  const [chkValidPwd, setChkValidPwd] = useState(false); //비밀번호 유효성
  const [validPwdMsg, setValidPwdMsg] = useState('');
  const [chkLast, setChkLast] = useState(false);





  //가입여부(이름, 사번)
  const checkSubscript = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/join/checkSubscript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usrNm, empNo }),
      });

      if (!response.ok) {
        throw new Error('검증 실패');
      }

      const data = await response.json();

      //일치하는 경우 가입 가능
      if (data.result == 1) setChkValid(true);
      else setChkValid(false);

      alert(data.message);

    } catch (error) {
      console.error(error);
      alert('에러');
    }
  };

  //아이디 중복 확인
  const checkDuplicate = async () => {
    if (loginId.length <= 2) {
      alert('최소 3자 이상 입력해주세요.');
      return;
    }
    axios.get(`${BASE_URL}/api/join/checkId`, {
      params: {
        loginId: loginId,
      }
    })
      .then((response) => {
        if (response.data == true) {
          setChkDuplicate(true);
          alert('사용 가능한 ID입니다.');
        }
        else {
          setChkDuplicate(false);
          alert('이미 사용중인 ID입니다.');
        }
      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  };


  //비밀번호 일치여부
  const checkSamePwd = async (value) => {
    setPassword2(value);
    if (password === value) {
      setChkSamePwd(true);
      setPwdLabel('비밀번호가 일치합니다.');
    }
    else {
      setChkSamePwd(false);
      setPwdLabel('비밀번호가 일치하지 않습니다.');
    }
  }

  const validatePwd = async () => {
    if (password.length < 8 || password.length > 20) {
      setValidPwdMsg('비밀번호는 8자 이상 20자 이하여야 합니다.');
      setChkValidPwd(false);
      return;
    }
    const hasLetter = /[A-Za-z]/.test(password);        // 영문자
    const hasNumber = /[0-9]/.test(password);           // 숫자
    const hasSpecial = /[^A-Za-z0-9]/.test(password);   //특수문자

    if (!hasLetter || !hasNumber || !hasSpecial) {
      setValidPwdMsg('비밀번호는 영문, 숫자, 특수문자를 모두 포함하여야 합니다.');
      setChkValidPwd(false);
      return;
    }
    else {
      setChkValidPwd(true);
    }
  };

  //이름, 사번 내용 바뀔때마다 가입확인 무효처리
  useEffect(() => {
    setChkValid(false);
  }, [usrNm, empNo])

  //로그인 아이디 바뀌면 중복확인 무효 처리
  useEffect(() => {
    setChkDuplicate(false);
  }, [loginId])

  //비밀번호 변경될때마다 유효성 검사
  useEffect(() => {
    validatePwd();
  }, [password])

  const lastChk = () => {

    if (!chkValid) {
      alert('가입확인을 해주세요');
      setChkLast(false);
      return false;
    }
    else if (!chkDuplicate) {
      alert('중복확인을 해주세요');
      setChkLast(false);
      return false;
    }
    else if (!chkSamePwd) {
      alert('비밀번호가 일치하지 않습니다.');
      setChkLast(false);
      return false;
    }
    else if (!chkValidPwd) {
      alert(validPwdMsg);
      setChkLast(false);
      return false;
    }
    setChkLast(true);
    return true;
  }

  const handleSubmit = async (e) => {

    //회원가입 처리 전 최종 확인
    if (!lastChk) return;

    e.preventDefault();
    //console.log("제출된 데이터:", form);

    const payload = {
      usrNm: usrNm,
      empNo: empNo,
      loginId: loginId,
      password: password
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/join/submit`, payload, {
      });
      console.log("저장성공:", response.data);
      alert('회원가입이 완료되었습니다.');
      // 회원가입 후 로그인 페이지로 이동 
      navigate('/login');
    } catch (error) {
      console.log("저장실패:", error);
    }
  };

  return (
    <div className={styles['login-page']}>
      <form className={styles['join-form-box']}>
        <div className={styles['join-title']}>회원가입</div>
        <div className={styles['join-desc']}>
          사번을 부여받은 직원만 가입가능합니다.
        </div>
        <div>
          <label className={styles['join-label']}>이름</label>
          <input
            className={styles['join-input']}
            type="text"
            value={usrNm}
            onChange={(e) => setUsrNm(e.target.value)}
          />
        </div>
        <div>
          <label className={styles['join-label']}>사번</label>
          <div className={styles['input-row']}>
            <input
              className={styles['join-input']}
              type="text"
              value={empNo}
              onChange={(e) => setEmpNo(e.target.value)}
            />
            <button type="button" className={styles['mini-button']} onClick={checkSubscript}>가입확인</button>
          </div>
        </div>
        <div>
          <label className={styles['join-label']}>로그인 아이디</label>
          <div className={styles['input-row']}>
            <input
              className={styles['join-input']}
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <button type="button" className={styles['mini-button']} onClick={checkDuplicate}>중복확인</button>
          </div>
        </div>
        <div>
          <label className={styles['join-label']}>비밀번호</label>
          <input
            className={styles['join-input']}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label className={styles['join-label']}>비밀번호 확인</label>
          <input
            className={styles['join-input']}
            type="password"
            value={password2}
            onChange={(e) => checkSamePwd(e.target.value)}></input>
          <label>{pwdLabel}</label>
        </div>
        <button className={styles['join-button']}
          onClick={handleSubmit}>
          가입
        </button>
      </form>
    </div>
  )
}

export default Join
