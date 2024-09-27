import { UserLoginProps } from "../../types/UserLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css'

const Login = () => {
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState<UserLoginProps>({
        email: '',
        senha:''
    })

    // Função para lidar com a mudança dos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value, // Atualiza o campo específico
        });
    };

    // Função para fazer o login
    const handleLogin = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const user = JSON.parse(savedUser);

            // Verifica se o email e a senha correspondem
            if (user.email === userLogin.email && user.senha === userLogin.senha) {
                alert('Login bem-sucedido!');
                navigate('/projeto'); // Redireciona para a página principal (exemplo)
            } else {
                alert('Email ou senha incorretos!');
            }
        } else {
            alert('Usuário não encontrado! Por favor, registre-se.');
        }
    };

    return (
        <div className="area-login">
            <div className="area-texto-login">
                <h1>Bem-vindo</h1>
                <p>Acesse utilizando seu e-mail e senha.</p>
            </div>
            <div className="area-caixa-formulario">
                <div className="campo-formulario">
                    <input 
                        type="text" 
                        name="email"
                        placeholder="Email" 
                        id="campo-email"
                        value={userLogin.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo-formulario">
                    <input 
                        type="password" 
                        name="senha"
                        placeholder="Senha"
                        value={userLogin.senha}
                        onChange={handleChange}
                    />
                </div>
                
                <p id="alterar-senha">Esqueci a senha</p>
                <button onClick={handleLogin}>Entrar</button>
            </div>
            <div className="area-registrar">
                <p>
                    Não possui conta? <Link to='/registro'><b>Registre-se</b></Link>
                </p>
            </div>
        </div>
    )
}

export default Login;