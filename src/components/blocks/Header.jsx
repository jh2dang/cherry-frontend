import { useLocation } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import logo from '../../assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';

function Header() {
  const location = useLocation();
  const { logout } = useUserStore();

  if (location.pathname !== '/main') {
    return null;
  }

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
  };

  return (
    <div className='h-[60px] flex justify-end px-10'>
      <DropdownMenu>
        <DropdownMenuTrigger className='bg-white w-5 h-5 rounded-full'>
          <Avatar className='shadow-[inset_0_0_0_2px_theme(colors.red.700)]'>
            <AvatarImage src={logo} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Header;
