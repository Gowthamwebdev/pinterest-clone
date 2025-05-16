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

export const updateUserProfile = async (formData: {
  name: string;
  first_name: string;
  last_name: string;
  bio: string;
}) => {
  try {
    const response = await apiClient.put('/users', formData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const fetchUserTags = async () => {
  try {
    const response = await apiClient.get('users/tags');
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUserTags = async (tagId: string) => {
  try {
    const response = await apiClient.delete(`users/tags/${tagId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
