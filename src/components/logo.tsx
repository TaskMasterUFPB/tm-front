import { useNavigate } from 'react-router-dom';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';  // Ícones para configurações e sair
import './Logo.css';  // Estilos do logo

const Logo = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');  // Remover dados de login ao sair
    navigate('/login');  // Redirecionar para a tela de login
  };

  const handleSettings = () => {
    navigate('/configuracoes');  // Redirecionar para a página de configurações
  };

  return (
    <div className="logo-container">
      <h1>Bem-vindo ao Logo</h1>
      <div className="nav-icons">
        <div className="icon-item" onClick={handleSettings}>
          <FaCog className="icon" />
          <span className="icon-text">Configurações</span>
        </div>
        <div className="icon-item" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span className="icon-text">Sair</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
