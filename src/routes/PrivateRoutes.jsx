import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

export const PrivateRoute = () => {
  const isLogin = useUserStore((state) => state.isLoggedIn);

  if (!isLogin) {
    alert('로그인이 필요합니다.');
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};
