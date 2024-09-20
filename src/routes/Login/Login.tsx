import { Link } from "react-router-dom";
import './Login.css'

const Login = () => {
    return (
        <div className="area-login">
            <div className="area-texto-login">
                <h1>Bem-vindo</h1>
                <p>Acesse utilizando seu e-mail e senha.</p>
            </div>
            <div className="area-caixa-formulario">
                <div className="campo-formulario">
                    <input type="text" placeholder="Email" id="campo-email"/>
                </div>
                <div className="campo-formulario">
                    <input type="text" placeholder="Senha"/>
                </div>
                
                <p id="alterar-senha">Esqueci a senha</p>
                <button>Entrar</button>
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