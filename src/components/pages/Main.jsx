import TodoBoard from '../blocks/TodoBoard';
import WelcomeBanner from '../blocks/WelcomeBanner';

function Main() {
  return (
    <div>
      <h1>나만의 체크리스트</h1>
      <h1>Cherry</h1>
      <h1>메인화면입니다.</h1>
      <WelcomeBanner />
      <TodoBoard />
    </div>
  );
}

export default Main;
