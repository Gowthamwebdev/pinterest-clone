import { Google } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import pinterestSvg from '/pinterest.svg';
import SignupForm from './Signup';
import LoginForm from './Login';

type AuthModalProps = {
  onClose: () => void;
  defaultType: 'login' | 'signup';
};

const AuthModal: React.FC<AuthModalProps> = ({ onClose, defaultType }) => {
  const [isLogin, setIsLogin] = useState(defaultType === 'login');

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-[999]"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white p-8 w-[360px] rounded-2xl shadow-lg text-center relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-600 text-xl focus:outline-none hover:text-gray-800"
            >
              <CloseIcon />
            </button>
            <img
              src={pinterestSvg}
              alt="Pinterest Logo"
              className="w-8 mx-auto mb-5"
            />

            <h4
              className="text-2xl font-bold mb-2 text-gray-800"
              style={{ fontFamily: 'sans-serif' }}
            >
              Welcome to Pinterest
            </h4>

            {isLogin ? <LoginForm /> : <SignupForm />}

            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-sm font-medium text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button className="w-full py-2 px-4 border border-gray-300 rounded-full flex items-center justify-center gap-3 text-gray-700 font-semibold hover:bg-gray-100">
              <Google className="text-lg" />
              Continue with Google
            </button>

            <div className="text-sm mt-1 text-gray-500">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-red-600 font-bold hover:underline focus:outline-none"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthModal;
