import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayUserPosts from './DisplayUserPosts';
import { handleNavigate } from '../../utils/functions';

interface UserProps {
  userData: {
    id: string;
    name: string;
    email: string;
    profile_img: string;
  };
  isOwnProfile: boolean;
}

const DisplayUserProfile: React.FC<UserProps> = ({
  userData,
  isOwnProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        {userData.profile_img ? (
          <img
            src={userData.profile_img}
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            <span className="text-gray-600 text-3xl font-medium">
              {userData.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <h1 className="text-2xl font-bold">{userData.name}</h1>
        <p className="text-gray-500">{userData.email}</p>
        <p className="text-gray-500">0 following</p>

        <div className="flex gap-4 mt-4">
          {isOwnProfile ? (
            <>
              <button className="px-4 py-3 bg-gray-300 rounded-2xl font-semibold cursor-pointer hover:bg-gray-400 transition">
                Share
              </button>
              <button
                className="px-4 py-3 bg-gray-300 rounded-2xl font-semibold cursor-pointer hover:bg-gray-400 transition"
                onClick={() =>
                  handleNavigate(navigate, '/settings/edit-profile')
                }
              >
                Edit profile
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-3 bg-gray-300 rounded-2xl font-semibold cursor-pointer hover:bg-gray-400 transition">
                Message
              </button>
              <button className="px-4 py-3 bg-red-500 rounded-2xl font-semibold cursor-pointer text-white hover:bg-red-600 transition">
                Follow
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <div className="flex justify-center space-x-8">
          <button
            className={`py-4 px-1 font-medium text-sm border-b-2 cursor-pointer ${
              activeTab === 'created'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('created')}
          >
            Created
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm border-b-2 cursor-pointer ${
              activeTab === 'saved'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </button>
        </div>
      </div>

      <div className="mt-4">
        {userData.id && (
          <DisplayUserPosts userId={userData.id} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default DisplayUserProfile;
