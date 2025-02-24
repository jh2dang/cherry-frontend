import { useState } from 'react';
import { getAllUser } from '../../apis/userApi';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // TODO: 로그인API 만들고 연동하기
  const handleLogin = async () => {
    try {
      const users = await getAllUser();
      const userExists = users.some(
        (user) => user.name === name && user.email === email
      );
      if (userExists) {
        alert('로그인 성공');
        navigate('/main');
      } else {
        setLoginMessage(
          '계정이 존재하지 않거나, 비밀번호가 올바르지 않습니다.'
        );
      }
    } catch (error) {
      console.error(error);
      setLoginMessage('서버 오류입니다. 잠시후 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='이름'
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='이메일'
      />
      <button onClick={handleLogin}>로그인</button>
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
}

export default Login;
