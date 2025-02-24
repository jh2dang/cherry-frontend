import { defaultInstance } from './axios';

export const getPosts = async (skip = 0, limit = 10) => {
  try {
    const response = await defaultInstance.get(
      `/posts?skip=${skip}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

export const createPost = async (userId, title, description) => {
  try {
    const response = await defaultInstance.post(`/users/${userId}/posts`, {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    throw error;
  }
};
