import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../apis/postApi';

function TodoWrite({ userId, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('중간');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // 새로운 Todo 추가
  const handleCreatePost = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    setLoading(true);

    const newDescription = `[${priority}] ${description.trim()}${
      isChecked ? ' [checked]' : ''
    }`;

    try {
      const newPost = await createPost(userId, title, newDescription);
      setTitle('');
      setDescription('');
      setPriority('중간');
      setIsChecked(false);

      if (onCreate) onCreate(newPost);
    } catch (error) {
      console.error('할 일 추가 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='todo-write'>
      <h3>새로운 할 일 추가</h3>
      <input
        type='text'
        placeholder='제목 입력'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='설명 입력'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>우선순위: </label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value='높음'>높음</option>
        <option value='중간'>중간</option>
        <option value='낮음'>낮음</option>
      </select>

      <button onClick={handleCreatePost} disabled={loading}>
        {loading ? '등록 중...' : '+'}
      </button>
    </div>
  );
}

TodoWrite.propTypes = {
  userId: PropTypes.number.isRequired,
  onCreate: PropTypes.func,
};

export default TodoWrite;
