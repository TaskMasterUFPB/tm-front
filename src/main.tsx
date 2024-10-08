import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Login from './routes/Login/Login';
import Registro from './routes/Registro/Registro';
import Task from './routes/Task/Task';
import Projeto from './routes/Projeto/Projeto';
import './index.css';
import Logo from './components/logo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // O App gerencia o roteamento e autenticação
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registro",
        element: <Registro />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/projeto",
        element: <Projeto />,
      },
      {
        path: "/logo",
        element: <Logo />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

