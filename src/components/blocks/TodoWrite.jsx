import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../apis/postApi';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function TodoWrite({ userId, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('중간');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // 새로운 Todo 추가
  const handleCreatePost = async () => {
    if (!title.trim()) {
      alert('빈 내용은 등록할 수 없습니다.');
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
    <div>
      <div className='mt-5 h-[50px] flex gap-2 space-x-1'>
        <Input
          type='text'
          placeholder='할일을 입력해주세요.'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='h-full'
        />
        <Button
          onClick={handleCreatePost}
          disabled={loading}
          variant='destructive'
          className='h-full'
        >
          <p>{loading ? '등록 중...' : '+'}</p>
        </Button>
      </div>
    </div>
  );
}

TodoWrite.propTypes = {
  userId: PropTypes.number.isRequired,
  onCreate: PropTypes.func,
};

export default TodoWrite;
