import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const baseURL = "http://ec2-3-27-168-60.ap-southeast-2.compute.amazonaws.com:8000"
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const signUp = async () => {
    console.log("클릭")
    console.log(name)
    console.log(email)
    try {
      // todo: 환경변수 사용
      const response = await axios.post(baseURL+"/users", {
      // const response = await axios.post("http://3.27.168.60:8000/users", {
        name: name,
        email: email,
      })
      console.log("회원가입 성공:", response.data);
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <h1>TEST</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={signUp}>로그인</button>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
