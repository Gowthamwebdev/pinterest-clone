import { useState } from 'react';
import Navbar from '../components/layout/LandingNav';
import AuthModal from '../components/auth/AuthModal';

const LandingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        onLoginClick={() => {
          setAuthType('login');
          setOpenModal(true);
        }}
        onSignupClick={() => {
          setAuthType('signup');
          setOpenModal(true);
        }}
      />

      <div className="flex-1 flex items-center justify-center text-3xl font-bold text-gray-600">
        Welcome to Our Pinterest ✨
      </div>

      {openModal && (
        <AuthModal onClose={() => setOpenModal(false)} defaultType={authType} />
      )}
    </div>
  );
};

export default LandingPage;
