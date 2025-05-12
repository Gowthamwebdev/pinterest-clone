import { postState } from '../types/postTypes';
import apiClient from './apiClient';

export const getPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (
  postData: postState & {
    image: File | Blob;
  },
) => {
  try {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.desc);
    formData.append('tags', postData.tags);
    // formData.append('board', postData.board);
    formData.append('image', postData.image);

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
