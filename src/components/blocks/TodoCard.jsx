import { useState } from 'react';
import PropTypes from 'prop-types';
import { updatePost, deletePost } from '../../apis/postApi';

function TodoCard(props) {
  const initialChecked = props.description.endsWith('[checked]');
  const [isChecked, setIsChecked] = useState(initialChecked);

  // 체크
  const handleCheckbox = async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    let newDesc = props.description.replace(' [checked]', '');
    if (newChecked) {
      newDesc += ' [checked]';
    }

    try {
      await updatePost(props.postId, props.title, newDesc);
    } catch (error) {
      console.error('체크 상태 업데이트 실패:', error);
    }
  };

  // 삭제
  const handleDelete = async () => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!isConfirmed) return;

    try {
      await deletePost(props.postId);
      if (props.onDelete) {
        props.onDelete(props.postId);
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <div>
      <input type='checkbox' checked={isChecked} onChange={handleCheckbox} />
      <h3>{props.title}</h3>
      <p>{props.description.replace(' [checked]', '')}</p>
      <button onClick={handleDelete}>삭제</button>
      <hr />
    </div>
  );
}

TodoCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  ownerId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

TodoCard.defaultProps = {
  description: '-',
};

export default TodoCard;
