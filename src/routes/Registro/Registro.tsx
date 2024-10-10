import { UserRegistroProps } from "../../types/UserRegistro";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Registro.css';
import { usuarioApi } from "../../server/usuario";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

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

    async function handleSubmit() {
        // Verifica se as senhas coincidem
        if (user.senha !== user.confirmarSenha) {
            alert('Os campos de Senha e Confirmar Senha devem ser idênticos. Por favor, verifique e tente novamente.');
            return false;
        }
        
        try {
            const resposta = await usuarioApi.registrar({
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                cargo: 'FUNCIONARIO'
            })

            if (resposta.status === 201) {
                localStorage.setItem('userJwt', resposta.data.token)
                navigate('/')
            }
        } catch (error) {
            resetaForm()
            alert('Erro ao criar usuário!')
        }
    }

    function resetaForm() {
        setUser({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        })
    }

    return (
        <div className="area-registro">
            <div className="area-texto-registro">
                <h1>Registro</h1>
                <p>Realize o seu cadastro para acessar nossa plataforma</p>
            </div>
            <div className="area-caixa-formulario-r">
                <div className="campo-formulario-r">
                    <Input
                        id="campo-email-r"
                        name="nome"
                        type="text"
                        value={user.nome}
                        onChange={handleChange}
                        placeholder="Nome Completo"
                        width="65%"
                    />
                </div>
                <div className="campo-formulario-r">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        width="65%"
                    />
                </div>
                <div className="campo-formulario-r">
                    <Input
                        id="senha"
                        name="senha"
                        type="password"
                        value={user.senha}
                        onChange={handleChange}
                        placeholder="Senha"
                        width="65%"
                    />
                </div>
                <div className="campo-formulario-r">
                    <Input
                        id="confirmar-senha"
                        name="confirmarSenha"
                        type="password"
                        value={user.confirmarSenha}
                        onChange={handleChange}
                        placeholder="Confirmar Senha"
                        width="65%"
                    />
                </div>
                <Button
                    id="button-criar"
                    label="Criar"
                    onClick={handleSubmit}
                    width="35%"
                />
                <p>
                    <Link to='/'>Voltar para login</Link>
                </p>
            </div>
        </div>
    )
}

export default Registro;