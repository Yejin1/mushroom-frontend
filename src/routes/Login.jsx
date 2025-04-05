import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import './Login.css'

function Login() {

  let navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-box">
        <img src={'/main_mushroom1.png'} className="login-mushroom"/>
        <h1 className="title"> <span className="title-mushroom">버섯상사</span> 전자결재</h1>
        <div>
          <input type="text" placeholder='아이디' className="login-input"></input>
          <input type="text" placeholder='비밀번호' className="login-input"></input>
        </div>
        <div>
          <button className='login-button' onClick={()=>{navigate("/home")}}> 로그인</button>
        </div>
      </div>
    </div>
  )
}

export default Login
