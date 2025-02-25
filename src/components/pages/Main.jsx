import TodoBoard from '../blocks/TodoBoard';
import WelcomeBanner from '../blocks/WelcomeBanner';

function Main() {
  return (
    <div className='h-[800px] overflow-y-scroll'>
      <WelcomeBanner />
      <TodoBoard />
    </div>
  );
}

export default Main;
