import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

const Alert = forwardRef(({ title, desc, url }, ref) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (url) {
      navigate(url);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger ref={ref} className='hidden'></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

Alert.displayName = 'Alert';

Alert.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  url: PropTypes.string,
};

Alert.defaultProps = {
  desc: '',
};

export default Alert;
