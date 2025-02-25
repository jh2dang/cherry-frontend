import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className='w-96 h-full d-flex justify-center p-5'>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
