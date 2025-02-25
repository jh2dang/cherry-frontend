import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updatePost, deletePost } from '../../apis/postApi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { HiOutlineX } from 'react-icons/hi';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../ui/input';

function TodoCard({ postId, title, description, onDelete, onUpdate }) {
  const [isChecked, setIsChecked] = useState(false);
  const [priority, setPriority] = useState('중간');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    const checked = description.includes('[checked]');
    const pri = description.match(/\[(높음|중간|낮음)\]/);

    setIsChecked(checked);
    setPriority(pri ? pri[1] : '중간');
    setEditTitle(title);
  }, [description, title]);

  const updatePostData = async (newChecked, newPriority, newTitle) => {
    const formattedDesc = `[${newPriority}]${newChecked ? ' [checked]' : ''}`;
    try {
      await updatePost(postId, newTitle, formattedDesc);
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  // 체크
  const handleCheckbox = async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    updatePostData(newChecked, priority, title);
    onUpdate(postId, { isChecked: newChecked });
  };

  // 우선순위
  const handlePriority = async (newPriority) => {
    setPriority(newPriority);
    updatePostData(isChecked, newPriority, title);
    onUpdate(postId, { newPriority });
  };

  // 삭제
  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deletePost(postId);
      if (onDelete) onDelete(postId);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // 수정 & 저장 & 취소
  const handleEdit = () => setIsEditing(true);
  const handleQuit = () => setIsEditing(false);

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    setIsEditing(false);
    await updatePostData(isChecked, priority, editTitle);
    onUpdate(postId, { newTitle: editTitle });
  };

  return (
    <div
      className={`p-4 border rounded-md shadow-md flex gap-2 space-x-1 relative ${isChecked ? 'opacity-[0.6]' : 'opacity-1'}`}
    >
      {/* 비활성화 */}
      {isChecked && (
        <div className='w-full h-full bg-gray-500/[.1] absolute left-0 top-0'></div>
      )}

      {/* 체크박스, 내용 */}
      <div className='flex gap-3 w-[200px]'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckbox}
            className="w-5 h-5 appearance-none border border-gray-300 rounded-full bg-white checked:bg-red-500 checked:border-red-500 
                relative checked:before:content-['✔'] checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 
                checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:text-white checked:before:text-sm cursor-pointer"
          />
        </div>

        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className='w-full p-2 border rounded'
          />
        ) : (
          <div className='font-bold flex items-center'>{title}</div>
        )}
      </div>

      {/* 우선순위, 아이콘들 */}
      <div className='flex gap-3 w-[130px]'>
        <Select value={priority} onValueChange={handlePriority}>
          <SelectTrigger className='w-[70px]'>
            <SelectValue placeholder='우선순위' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='높음'>높음</SelectItem>
              <SelectItem value='중간'>중간</SelectItem>
              <SelectItem value='낮음'>낮음</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className='mt-2 space-x-2 flex'>
          {isEditing ? (
            <>
              <div onClick={handleSave} className='w-5 h-5 cursor-pointer'>
                <HiOutlineCheckCircle />
              </div>
              <div onClick={handleQuit} className='w-5 h-5 cursor-pointer'>
                <HiOutlineX />
              </div>
            </>
          ) : (
            <>
              <div onClick={handleEdit} className='w-5 h-5 cursor-pointer'>
                <HiOutlinePencilAlt />
              </div>
              <div onClick={handleDelete} className='w-5 h-5 cursor-pointer'>
                <HiOutlineTrash />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

TodoCard.propTypes = {
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

TodoCard.defaultProps = {
  description: '[중간]',
};

export default TodoCard;
