import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuthStore } from '@stores/AuthStore';

const LogoutForm = () => {
  const navigate = useNavigate();
  const resetAuth = useAuthStore((state) => state.resetAuth);

  const handleLogout = () => {
    resetAuth();
    Cookies.remove('token');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <button onClick={handleLogout} className="w-full text-left py-2">
      Sign out
    </button>
  );
};

export default LogoutForm;
