import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <img src={'/main_mushroom1.png'} width="28%"/>
      <h1> <span className="title-mushroom">버섯상사</span> 전자결재</h1>
      <div>
        <input type="text" placeholder='아이디'></input>
        <input type="text" placeholder='비밀번호'></input>
      </div>
      <div>
        <button className='btn-3d'> 로그인</button>
      </div>
    </>
  )
}

export default App
