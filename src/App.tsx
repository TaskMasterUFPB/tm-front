import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Outlet /> {/* Carrega as rotas das páginas */}
    </div>
  );
}

export default App;
