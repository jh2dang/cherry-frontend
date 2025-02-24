import { defaultInstance } from './axios';

export const getPosts = async (skip = 0, limit = 10) => {
  try {
    const response = await defaultInstance.get(
      `/posts?skip=${skip}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('목록 조회 실패:', error);
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
    console.error('작성 실패', error);
    throw error;
  }
};

export const updatePost = async (postId, title, description) => {
  try {
    const response = await defaultInstance.put(`/posts/${postId}`, {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    console.error('수정 실패', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await defaultInstance.delete(`/posts/${postId}`);
    return { message: '삭제 성공', id: postId };
  } catch (error) {
    console.error('삭제 실패', error);
    throw error;
  }
};
