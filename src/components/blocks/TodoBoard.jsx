import { useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import { getPosts } from '../../apis/postApi';
import TodoCard from './TodoCard';
import TodoWrite from './TodoWrite';

function TodoBoard() {
  const { user } = useUserStore();
  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        if (user?.id) {
          const userPosts = allPosts.filter(
            (post) => post.owner_id === user.id
          );
          setPosts(userPosts);
          setFilteredPosts(userPosts);
        }
      } catch (error) {
        console.error('목록 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, [user?.id]);

  // 검색
  useEffect(() => {
    if (!searchWord) {
      setFilteredPosts(posts);
    } else {
      const lowersearchWord = searchWord.toLowerCase();
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowersearchWord) ||
            post.description.toLowerCase().includes(lowersearchWord)
        )
      );
    }
  }, [searchWord, posts]);

  // 삭제 -> UI업데이트
  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  // 할 일 추가 -> UI 업데이트
  const handleCreate = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      <h1>{user?.name}님의 할 일</h1>
      <input
        type='text'
        placeholder='검색'
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <TodoCard
            key={post.id}
            title={post.title}
            description={post.description}
            ownerId={post.owner_id}
            postId={post.id}
            userId={user?.id}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>검색된 할 일이 없습니다.</p>
      )}
      <TodoWrite userId={user?.id} onCreate={handleCreate} />
    </div>
  );
}

export default TodoBoard;
