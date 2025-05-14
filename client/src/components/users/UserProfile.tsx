import { useEffect, useState } from 'react';
import { fetchUserProfileApi } from '../../api/authApi';
import { useUserStore } from '../../stores/userStore/userStore';
import { fetchOtherUserProfile } from '../../api/userApi';
import { useParams } from 'react-router-dom';

interface UserProfileProps {
  id?: string;
}
export const UserProfile: React.FC<UserProfileProps> = () => {
  const { id } = useParams();
  const { name, email, profile_img, setName, setEmail, setProfileImg } =
    useUserStore();
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = id
          ? await fetchOtherUserProfile(id)
          : await fetchUserProfileApi();
        setName(response.name);
        setEmail(response.email);
        setProfileImg(response.profile_img);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        {profile_img ? (
          <img
            src={profile_img}
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            <span className="text-gray-600 text-3xl font-medium">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-500">0 following</p>

        <div className="flex gap-4 mt-4">
          <button className="px-6 py-2 bg-gray-300 rounded-2xl font-semibold cursor-pointer hover:bg-gray-400 transition">
            Share
          </button>
          <button className="px-6 py-2 bg-gray-300 rounded-2xl font-semibold cursor-pointer hover:bg-gray-400 transition">
            Edit profile
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <div className="flex justify-center space-x-8">
          <button
            className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'created' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('created')}
          >
            Created
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'saved' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </button>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'created' ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Created Pins</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Saved Pins</h2>
          </div>
        )}
      </div>
    </div>
  );
};
