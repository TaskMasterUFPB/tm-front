import { UserRegistroProps } from "../../types/UserRegistro";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Registro.css';

const Registro = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserRegistroProps>({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    // Função para lidar com a mudança dos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value, // Atualiza o campo específico
        });
    };

    // Função para salvar o usuário no localStorage
    const handleSubmit = () => {
        if (user.nome && user.email && (user.senha === user.confirmarSenha)) {
            // Salva o usuário no localStorage
            localStorage.setItem('user', JSON.stringify(user));
            alert('Usuário registrado com sucesso!');
            navigate("/");
        } else if (user.senha !== user.confirmarSenha) {
            alert('Os campos de Senha e Confirmar Senha devem ser idênticos. Por favor, verifique e tente novamente.')
        }else {
            alert('Por favor, preencha todos os campos!');
        }
    };

    return (
        <div className="area-registro">
            <div className="area-texto-registro">
                <h1>Registro</h1>
                <p>Realize o seu cadastro para acessar nossa plataforma</p>
            </div>
            <div className="area-caixa-formulario-r">
                <div className="campo-formulario-r">
                    <input 
                        type="text"
                        name="nome"
                        placeholder="Nome completo" 
                        id="campo-email-r"
                        value={user.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-formulario-r">
                    <input 
                        type="text" 
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-formulario-r">
                    <input 
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={user.senha}
                        onChange={handleChange} 
                    />
                </div>
                <div className="campo-formulario-r">
                    <input 
                        type="password" 
                        name="confirmarSenha"
                        value={user.confirmarSenha}
                        placeholder="Confirmar senha" 
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmit}>Criar</button>
                <p>
                    <Link to='/'>Voltar para login</Link>
                </p>
            </div>
        </div>
    )
}

export default Registro;