import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Pages
import Login from './routes/Login/Login.tsx';
import Registro from './routes/Registro/Registro.tsx';
import Task from './routes/Task/Task.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element: <Login />
      },
      {
        path:"/registro",
        element: <Registro />
      },
      {
        path:"/task",
        element: <Task/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
