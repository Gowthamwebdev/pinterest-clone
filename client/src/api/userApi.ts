import apiClient from './apiClient';

export const fetchOtherUserProfile = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const fetchUserCreatedOrSavedPosts = async (
  userId: string,
  activeTab: 'created' | 'saved',
) => {
  try {
    const response = await apiClient.get(`/users/${userId}/posts/${activeTab}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
};
