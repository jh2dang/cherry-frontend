import { useNavigate } from 'react-router-dom';

function GoHome() {
  const navigate = useNavigate();
  return (
    <div className='w-full flex justify-center'>
      <p
        onClick={() => navigate('/')}
        className='text-sm text-gray-400 cursor-pointer'
      >
        시작 화면으로 가기
      </p>
    </div>
  );
}

export default GoHome;
