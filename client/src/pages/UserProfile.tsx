import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayUserProfile from '../components/users/DisplayUserProfile';
import { fetchOtherUserProfile } from '../api/userApi';
import { fetchUserProfile } from '../api/authApi';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    profile_img: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = id
          ? await fetchOtherUserProfile(id)
          : await fetchUserProfile();
        setUserData({
          id: response.id,
          name: response.name,
          email: response.email,
          profile_img: response.profile_img,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [id]);

  return <DisplayUserProfile userData={userData} isOwnProfile={!id} />;
};

export default UserProfile;
