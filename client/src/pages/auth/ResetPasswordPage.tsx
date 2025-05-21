import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '@api/authApi';
import useSnackBar from '@context/SnackBarContext';
import { useState } from 'react';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const token = searchParams.get('token');
  const showSnackBar = useSnackBar();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!token) {
      showSnackBar('Invalid or missing token', 'error');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      showSnackBar('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(token, newPassword);
      showSnackBar(response.message, 'success');
      navigate('/auth/login');
    } catch (error) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : 'Reset failed';
      showSnackBar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="flex flex-col items-center pt-24 px-4">
        <h1 className="text-3xl font-semibold text-black mb-4 mt-0 text-center">
          Reset your password
        </h1>

        <p className="text-gray-600 text-center text-sm mb-5">
          Enter a new password to reset your account
        </p>

        <div className="w-full max-w-md">
          <div className="flex flex-grow items-center bg-white border border-gray-300 rounded-full shadow-md px-4 py-3 gap-2 hover:border-gray-400 transition">
            <input
              type="password"
              placeholder="New password"
              className="w-full bg-transparent text-gray-700 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            className={`w-full bg-red-600 text-white font-semibold text-lg px-6 py-3 rounded-full mt-6 hover:bg-red-700 transition-all ${
              loading || !newPassword
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 hover:shadow-lg'
            }`}
            onClick={handleReset}
            disabled={loading || !newPassword}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
