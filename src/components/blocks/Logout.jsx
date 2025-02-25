import useUserStore from '../../store/useUserStore';

function Logout() {
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
  };
  return (
    <>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}

export default Logout;
