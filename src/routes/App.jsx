import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Test from '../components/pages/test';
import Layout from '../components/blocks/Layout';
import Home from '../components/pages/Home';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
