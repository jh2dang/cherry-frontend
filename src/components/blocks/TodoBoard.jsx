import { useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import { getPosts } from '../../apis/postApi';
import TodoCard from './TodoCard';
import TodoWrite from './TodoWrite';
import { Input } from '../ui/input';

function TodoBoard() {
  const { user } = useUserStore();
  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchPosts();
    }
  }, [user?.id]);

  const fetchPosts = async () => {
    try {
      const allPosts = await getPosts();
      if (user?.id) {
        const userPosts = allPosts.filter((post) => post.owner_id === user.id);
        const sortedPosts = sort(userPosts);
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      }
    } catch (error) {
      console.error('목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    const lowerSearchWord = searchWord.toLowerCase();
    setFilteredPosts(
      searchWord
        ? sort(
            posts.filter(
              (post) =>
                post.title.toLowerCase().includes(lowerSearchWord) ||
                post.description.toLowerCase().includes(lowerSearchWord)
            )
          )
        : posts
    );
  }, [searchWord, posts]);

  // 우선순위 및 체크 정렬 함수
  const sort = (tasks) => {
    const priority = { 높음: 1, 중간: 2, 낮음: 3 };
    return [...tasks].sort((a, b) => {
      const aChecked = a.description.includes('[checked]');
      const bChecked = b.description.includes('[checked]');
      if (aChecked !== bChecked) return aChecked - bChecked;

      const aPriority =
        a.description.match(/\[(높음|중간|낮음)\]/)?.[1] || '중간';
      const bPriority =
        b.description.match(/\[(높음|중간|낮음)\]/)?.[1] || '중간';
      return priority[aPriority] - priority[bPriority];
    });
  };

  // 삭제
  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setFilteredPosts((prevFiltered) =>
      prevFiltered.filter((post) => post.id !== postId)
    );
  };

  // 할일 추가
  const handleCreate = (newPost) => {
    setPosts((prevPosts) => sort([newPost, ...prevPosts]));
  };

  // 할일 수정
  const handleUpdate = (postId, { newPriority, isChecked, newTitle }) => {
    setPosts((prevPosts) =>
      sort(
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                title: newTitle || post.title,
                description:
                  `[${newPriority || post.description.match(/\[(높음|중간|낮음)\]/)?.[1] || '중간'}]` +
                  (isChecked !== undefined
                    ? isChecked
                      ? ' [checked]'
                      : ''
                    : post.description.includes('[checked]')
                      ? ' [checked]'
                      : ''),
              }
            : post
        )
      )
    );
  };

  return (
    <div className='flex flex-col gap-5'>
      <Input
        placeholder='검색어를 입력하세요.'
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        className='rounded-full h-[50px] mb-5'
      />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <TodoCard
            key={post.id}
            title={post.title}
            description={post.description}
            postId={post.id}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <div className='flex w-full justify-center'>
          <p>등록된 할 일이 없습니다.</p>
        </div>
      )}
      <TodoWrite userId={user?.id} onCreate={handleCreate} />
    </div>
  );
}

export default TodoBoard;
