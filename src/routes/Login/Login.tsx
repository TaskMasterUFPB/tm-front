import { UserLoginProps } from "../../types/UserLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import './Login.css'
import { usuarioApi } from "../../server/usuario";

const Login = () => {
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState<UserLoginProps>({
        email:'',
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
    // const handleLogin = () => {
    //     const savedUser = localStorage.getItem('user');
    //     if (savedUser) {
    //         const user = JSON.parse(savedUser);

    //         // Verifica se o email e a senha correspondem
    //         if (user.email === userLogin.email && user.senha === userLogin.senha) {
    //             alert('Login bem-sucedido!');
    //             navigate('/projeto'); // Redireciona para a página principal (exemplo)
    //         } else {
    //             alert('Email ou senha incorretos!');
    //         }
    //     } else {
    //         alert('Usuário não encontrado! Por favor, registre-se.');
    //     }
    // };

    async function handleLogin() {
        try {
            const resposta = await usuarioApi.login(
                userLogin.email,
                userLogin.senha
            )

            if (resposta.status === 200) {
                localStorage.setItem('userJwt', resposta.data.token)
                navigate('/projeto')
            }
        } catch (error) {
            alert('Email ou senha incorretos!')
        }
    }

    return (
        <div className="area-login">
            <div className="area-texto-login">
                <h1>Bem-vindo</h1>
                <p>Acesse utilizando seu e-mail e senha.</p>
            </div>
<<<<<<< Updated upstream
            <div className="area-caixa-formulario">           

                <div className="campo-formulario-email">
                    <Input
                        id = "email"
                        name = "email"
                        type = "email"
                        value = {userLogin.email}
                        onChange = {handleChange}
                        placeholder = "Email"
                        width = "65%"
                    />
                </div>

                <div className="campo-formulario-senha">
                    <Input
                        id = "senha"
                        name = "senha"
                        type = "password"
                        value = {userLogin.senha}
                        onChange = {handleChange}
                        placeholder = "Senha"
                        width = "65%"
=======
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
>>>>>>> Stashed changes
                    />
                </div>

                <p id="alterar-senha">Esqueci a senha</p>

                <Button
                    label = "Entrar"
                    onClick = {handleLogin}
                    width = "35%"
                />
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
