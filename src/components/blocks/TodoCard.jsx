import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updatePost, deletePost } from '../../apis/postApi';

function TodoCard({ postId, title, description, onDelete }) {
  const [isChecked, setIsChecked] = useState(false);
  const [priority, setPriority] = useState('중간');
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');

  // 마운트될 때 description 파싱 (한번만)
  useEffect(() => {
    const checked = description.includes('[checked]');
    const pri = description.match(/\[(높음|중간|낮음)\]/);

    setIsChecked(checked);
    setPriority(pri ? pri[1] : '중간');
    setText(
      description
        .replace(/\[(높음|중간|낮음)\]/, '')
        .replace(' [checked]', '')
        .trim()
    );
    setEditTitle(title);
    setEditText(
      description
        .replace(/\[(높음|중간|낮음)\]/, '')
        .replace(' [checked]', '')
        .trim()
    );
  }, [description, title]);

  // API업데이트 (공통)
  const updatePostData = async (newChecked, newPriority) => {
    const newDesc = `[${newPriority}] ${text}${newChecked ? ' [checked]' : ''}`;

    try {
      await updatePost(postId, title, newDesc);
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  // 체크박스
  const handleCheckbox = async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    updatePostData(newChecked, priority);
  };

  // 우선순위
  const handlePriority = async (event) => {
    const newPriority = event.target.value;
    setPriority(newPriority);
    updatePostData(isChecked, newPriority);
  };

  // 삭제
  const handleDelete = async () => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!isConfirmed) return;

    try {
      await deletePost(postId);
      if (onDelete) onDelete(postId);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // 수정
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleQuit = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('제목을 입력하세요.');
      return;
    }

    setIsEditing(false);
    setText(editText);

    await updatePostData(isChecked, priority, editTitle, editText);
  };

  return (
    <div>
      <input type='checkbox' checked={isChecked} onChange={handleCheckbox} />
      <h3>{title}</h3>
      <p>{text}</p>

      <label>우선순위: </label>
      <select value={priority} onChange={handlePriority}>
        <option value='높음'>높음</option>
        <option value='중간'>중간</option>
        <option value='낮음'>낮음</option>
      </select>

      <button onClick={handleDelete}>삭제</button>
      <button onClick={handleEdit}>수정</button>
      {isEditing && (
        <>
          <input
            type='text'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleQuit}>취소</button>
        </>
      )}
      <hr />
    </div>
  );
}

TodoCard.propTypes = {
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onDelete: PropTypes.func,
};

TodoCard.defaultProps = {
  description: '-',
};

export default TodoCard;
