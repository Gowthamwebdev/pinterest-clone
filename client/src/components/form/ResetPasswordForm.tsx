import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Close } from '@mui/icons-material';
import { forgetPassword, resetPassword } from '../../api/authApi';
import useSnackBar from '../../context/SnackBarContext';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();
  const showSnackBar = useSnackBar();

  const handleSearch = async () => {
    if (!email.includes('@')) return;

    const response = await forgetPassword(email);
    showSnackBar(response, 'error');

    try {
      setResetMode(true);
    } catch (error) {
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setResetLoading(true);
    try {
      const response = await forgetPassword(email);
      showSnackBar(response, 'error');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="flex flex-col items-center pt-24 px-4">
        <h1 className="text-3xl font-semibold text-black mb-4 mt-0 text-center">
          {resetMode
            ? 'Reset your password'
            : "Let's find your Pinterest account"}
        </h1>

        <p className="text-gray-600 text-center text-sm mb-5">
          What's your email, name, or username?
        </p>

        <div className="w-full max-w-md">
          <div className="w-full max-w-md flex items-center gap-3">
            <div className="flex flex-grow items-center bg-white border border-gray-300 rounded-full shadow-md px-3 py-3 gap-2 hover:border-gray-400 transition">
              {!resetMode ? <Search className="text-gray-500" /> : null}
              <input
                type="email"
                placeholder="Search"
                className="w-full bg-transparent text-gray-700 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {resetMode && (
                <button
                  onClick={() => setResetMode(false)}
                  className="text-gray-500"
                >
                  <Close />
                </button>
              )}
            </div>

            <button
              className={`bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-all ${
                !email.includes('@') || resetMode || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-red-700 hover:scale-105 hover:shadow-lg cursor-pointer'
              }`}
              disabled={!email.includes('@') || resetMode || loading}
              onClick={handleSearch}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {resetMode && (
          <button
            className={`w-full max-w-md bg-red-600 text-white font-semibold text-lg px-6 py-2 rounded-full mt-6 hover:bg-red-700 transition ${
              resetLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleResetPassword}
            disabled={resetLoading}
          >
            {resetLoading ? 'Sending...' : 'Send a password reset email'}
          </button>
        )}
      </div>
    </div>
  );
};
export default ResetPasswordPage;
