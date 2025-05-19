import { AxiosError } from 'axios';
import { loginType, signupType } from '../types/userTypes';
import apiClient from './apiClient';

const handleApiError = (error: unknown): Error => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return new Error(error.response.data.message || 'Something went wrong');
    } else if (error.request) {
      return new Error('No response from server');
    }
  }

  if (error instanceof Error) {
    return new Error(error.message || 'An error occurred');
  }

  return new Error('An unknown error occurred');
};

export const userLoginApi = async ({ email, password }: loginType) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });

    if (response.status !== 201) {
      throw new Error('Invalid credentials');
    }
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const userSignupApi = async (userData: signupType) => {
  try {
    const response = await apiClient.post('/auth/signup', userData);

    if (response.status !== 201) {
      throw new Error('Signup failed');
    }
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error);
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const response = await apiClient.post('auth/forget-password', {
      email,
    });
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error);
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await apiClient.post('/auth/reset-password', {
      email,
      newPassword,
    });

    if (response.status !== 200) {
      throw new Error('Failed to reset password');
    }

    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error);
  }
};
