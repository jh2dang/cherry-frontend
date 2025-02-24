import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx';
import App from './routes/App';

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
);
