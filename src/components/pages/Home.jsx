import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>나만의 체크리스트</h1>
      <h1>Cherry</h1>
      <div onClick={() => navigate('/login')}>로그인</div>
      <div onClick={() => navigate('/signup')}>회원가입</div>
    </div>
  );
}

export default Home;
