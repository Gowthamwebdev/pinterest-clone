import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayUserProfile from '@components/users/DisplayUserProfile';
import { fetchOtherUserProfile } from '@api/userApi';
import { fetchUserProfile } from '@api/authApi';
import { useUserStore } from '@stores/userStore/userStore';

const UserProfile = () => {
  const { id } = useParams();
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = id
          ? await fetchOtherUserProfile(id)
          : await fetchUserProfile();
        //state variable is removed and store is used
        setUser({
          userId: response.id,
          name: response.name,
          email: response.email,
          profile_img: response.profile_img,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [id, setUser]);

  return <DisplayUserProfile isOwnProfile={!id} />;
};

export default UserProfile;
