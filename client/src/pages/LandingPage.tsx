import { useState } from 'react';
import Navbar from '../components/layout/LandingNav';
import AuthModal from '../components/auth/AuthModal';
// import LandingPageHome from '../components/landing-page/LandingPageHome';
import LandingPageSearch from '../components/landing-page/LandingPageSearch';

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
      <>
        {/* <LandingPageHome /> */}
        <LandingPageSearch />
      </>

      {openModal && (
        <AuthModal onClose={() => setOpenModal(false)} defaultType={authType} />
      )}
    </div>
  );
};

export default LandingPage;
