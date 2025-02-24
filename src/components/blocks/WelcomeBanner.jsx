import useUserStore from '../../store/useUserStore';

function WelcomeBanner() {
  const { user } = useUserStore();

  return (
    <div>
      <h1>안녕하세요, {user.name}님!</h1>
    </div>
  );
}

export default WelcomeBanner;
