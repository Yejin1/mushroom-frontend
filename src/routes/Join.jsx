//  Join.jsx
/**
 * - 회원가입
 */

import React, {useEffect, useState} from "react"
import axios from 'axios'

function Join() {



  return (
    <div className="login-page">
      <form>
        <div>
          <label>이름</label>
          <input></input>
        </div>
        <div>
          <label>사번</label>
          <input></input>
        </div>
        <div>
          <label>로그인 아이디</label>
          <input></input>
        </div>
        <div>
          <label>비밀번호</label>
          <input></input>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input></input>
        </div>
      </form>
    </div>
  )
}

export default Join
