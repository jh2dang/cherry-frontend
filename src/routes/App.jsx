import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Test from '../components/pages/test';
import Layout from '../components/blocks/Layout';
import Home from '../components/pages/Home';
import SignUp from '../components/pages/SignUp';
import Login from '../components/pages/Login';
import Main from '../components/pages/Main';
import { PrivateRoute } from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/test',
        element: <Test />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'main',
            element: <Main />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className='w-full h-[900px] flex flex-col justify-center items-start shadow-2xl'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
