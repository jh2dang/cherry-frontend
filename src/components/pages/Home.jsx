import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Button } from '../ui/button';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className='h-full p-5 flex flex-col justify-center'>
        <div className='flex flex-col gap-y-20'>
          <div className='font-bold text-2xl'>
            <div>
              나만의 <span className='text-red-400'>체</span>크{' '}
              <span className='text-red-400'>리</span>스트,
            </div>
            <div>Cherry</div>
          </div>
          <div className='flex justify-center'>
            <img src={logo} className='w-40' />
          </div>
          <div className='flex flex-col gap-5'>
            <Button
              onClick={() => navigate('/login')}
              variant='destructive'
              size='lg'
            >
              Cherry 계정으로 로그인
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              className='w-full border-gray-200 bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-200 text-dark'
              size='lg'
            >
              아직 회원이 아니신가요?
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
