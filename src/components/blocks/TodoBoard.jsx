import { useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import { getPosts } from '../../apis/postApi';
import TodoCard from './TodoCard';

function TodoBoard() {
  const { user } = useUserStore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        if (user?.id) {
          const userPosts = allPosts.filter(
            (post) => post.owner_id === user.id
          );
          setPosts(userPosts);
        }
      } catch (error) {
        console.error('목록 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, [user?.id]);

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      <h1>{user?.name}님의 할 일</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
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
        <p>등록된 할 일이 없습니다.</p>
      )}
    </div>
  );
}

export default TodoBoard;
