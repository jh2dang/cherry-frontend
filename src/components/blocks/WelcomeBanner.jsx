import useUserStore from '../../store/useUserStore';

function WelcomeBanner() {
  const { user } = useUserStore();

  return (
    <div className='mt-10 mb-10'>
      <div className='text-lg font-md'>안녕하세요, {user.name}님!</div>
      <div className='text-3xl font-bold'>{user.name}❜s To do List</div>
    </div>
  );
}

export default WelcomeBanner;
