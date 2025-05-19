import { postType } from '../types/postTypes';
import apiClient from './apiClient';

export const createPost = async (formData: FormData) => {
  try {
    const response = await apiClient.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const toggleSavePost = async (postId: string) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/save`);
    return response.data;
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

export const checkIfPostIsSaved = async (postId: string) => {
  try {
    const response = await apiClient.get(`/posts/${postId}/is-saved`);
    return response.data;
  } catch (error) {
    console.error('Error checking if post is saved:', error);
    throw error;
  }
};

export const deletePostById = async (postId: string) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const editPostById = async (postId: string, postData: postType) => {
  try {
    const response = await apiClient.put(`/posts/${postId}`, { postData });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};
