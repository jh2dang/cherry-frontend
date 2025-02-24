import { useState } from 'react';
import { signUp } from '../../apis/userApi';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    try {
      const data = await signUp(name, email);
      console.log('회원가입 성공:', data);
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error(error);
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
}

export default SignUp;
