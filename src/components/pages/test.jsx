import { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
  const baseURL =
    'http://ec2-3-27-168-60.ap-southeast-2.compute.amazonaws.com:8000';
  // const baseURL = "http://3.27.168.60:8000"
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [posts, setPosts] = useState([]);

  const signUp = async () => {
    try {
      // todo: 환경변수 사용
      const response = await axios.post(baseURL + '/users', {
        name: name,
        email: email,
      });
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error(error);
    }
  };

  const submit = async () => {
    try {
      const response = await axios.post(baseURL + `/users/1/posts`, {
        title: title,
        description: desc,
      });
      console.log('글쓰기 성공:', response.data);
      alert('글 작성이 완료되었습니다!');
      getPost();
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(baseURL + '/posts?skip=0&limit=1000');
      setPosts(response.data);
      console.log('글 목록 불러오기 성공:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div>
        <h1>회원가입 테스트</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={signUp}>로그인</button>
      </div>
      <div>
        <h1>글쓰기 테스트</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={submit}>글쓰기</button>
      </div>
      <div>
        <h1>글 목록 테스트</h1>
        {posts &&
          posts.map((post, index) => (
            <div key={index}>
              <div>글번호: {post.id}</div>
              <div>제목: {post.title}</div>
              <div>내용: {post.description}</div>
              <hr></hr>
            </div>
          ))}
      </div>
    </>
  );
}

export default Test;
