import { defaultInstance } from './axios';

export const signUp = async (name, email) => {
  try {
    const response = await defaultInstance.post('/users', { name, email });
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await defaultInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await defaultInstance.get('/users?skip=0&limit=1000');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
