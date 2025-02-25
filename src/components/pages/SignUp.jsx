import { useRef, useState } from 'react';
import { signUp } from '../../apis/userApi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Alert from '../blocks/Alert';
import GoHome from '../blocks/GoHome';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const alertTriggerRef = useRef(null);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim()) {
      setErrorMessage('모든 항목을 채워주세요.');
      return;
    }
    setErrorMessage('');
    try {
      const data = await signUp(name, email);
      if (alertTriggerRef.current) {
        alertTriggerRef.current.click();
      }
      console.log('회원가입 성공:', data);
    } catch (error) {
      console.error(error);
      alert(
        '이미 존재하는 계정이거나, 네트워크 문제가 발생해 회원가입에 실패하였습니다.'
      );
    }
  };

  return (
    <div className='h-full p-5 flex flex-col justify-center'>
      <div className='flex flex-col gap-y-10'>
        <div>
          <div className='font-bold text-2xl'>Cherry와 함께</div>
          <div className='font-bold text-2xl'>
            편리한 할 일 관리를 시작해요.
          </div>
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
            title='회원가입 완료'
            desc='방금 가입한 계정으로 로그인 해 주세요.'
            ref={alertTriggerRef}
            url='/login'
          />
          <Button onClick={handleSignUp} variant='destructive' size='lg'>
            가입하기
          </Button>
          {errorMessage && (
            <p className='text-sm text-red-400'>{errorMessage}</p>
          )}
        </div>
        <GoHome />
      </div>
    </div>
  );
}

export default SignUp;
