import { useState } from 'react';
import useSnackBar from '@context/SnackBarContext';
import { forgetPassword } from '@api/authApi';
import { Search } from 'lucide-react';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const showSnackBar = useSnackBar();

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await forgetPassword(email);
      showSnackBar(response.message, 'success');
    } catch (error) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error as { message: string }).message
          : 'Something went wrong';
      showSnackBar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="flex flex-col items-center pt-24 px-4">
        <h1 className="text-3xl font-semibold text-black mb-4 mt-0 text-center">
          Let&apos;s find your Pinterest account
        </h1>

        <p className="text-gray-600 text-center text-sm mb-5">
          What&apos;s your email, name, or username?
        </p>

        <div className="w-full max-w-md">
          <div className="w-full max-w-md flex items-center gap-3">
            <div className="flex flex-grow items-center bg-white border border-gray-300 rounded-full shadow-md px-3 py-3 gap-2 hover:border-gray-400 transition">
              <Search className="text-gray-500" />
              <input
                type="email"
                placeholder="Search"
                className="w-full bg-transparent text-gray-700 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              className={`bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-all ${
                !email.includes('@') || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-red-700 hover:scale-105 hover:shadow-lg cursor-pointer'
              }`}
              disabled={!email.includes('@') || loading}
              onClick={handleSend}
            >
              {loading ? 'Sending...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
