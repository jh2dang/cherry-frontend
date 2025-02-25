import { useRef, useState } from 'react';
import { getAllUser } from '../../apis/userApi';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore.js';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Alert from '../blocks/Alert';
import GoHome from '../blocks/GoHome';

function Login() {
  const navigate = useNavigate();
  const alertTriggerRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const { login } = useUserStore();

  // TODO: 로그인API 만들고 연동하기
  const handleLogin = async () => {
    try {
      const users = await getAllUser();

      const foundUser = users.find(
        (user) => user.name === name && user.email === email
      );

      if (foundUser) {
        login(foundUser.id, foundUser.name, foundUser.email);
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

  const openAlert = () => {
    if (alertTriggerRef.current) {
      alertTriggerRef.current.click();
    }
  };

  return (
    <div className='h-full p-5 flex flex-col justify-center'>
      <div className='flex flex-col gap-y-10'>
        <div>
          <div className='font-bold text-2xl'>Cherry 계정으로</div>
          <div className='font-bold text-2xl'>로그인 해주세요.</div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>name</Label>
          <Input
            type='email'
            id='email'
            placeholder='이름을 입력해 주세요.'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>email</Label>
          <Input
            type='email'
            id='email'
            placeholder='이메일을 입력해 주세요.'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <Alert
            title='준비중입니다.'
            desc='불편을 드려 죄송합니다.'
            ref={alertTriggerRef}
          />
          <Button
            onClick={openAlert}
            className='w-full border-gray-200 bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-200 text-dark'
            size='lg'
          >
            계정 찾기
          </Button>
          <Button onClick={handleLogin} variant='destructive' size='lg'>
            Cherry 계정으로 로그인
          </Button>
        </div>
        {loginMessage && <p className='text-sm text-red-400'>{loginMessage}</p>}
        <GoHome />
      </div>
    </div>
  );
}

export default Login;
