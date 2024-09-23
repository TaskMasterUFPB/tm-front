import { Link } from "react-router-dom";
import './Registro.css'
const Registro = () => {
    return (
        <div className="area-registro">
            <div className="area-texto-registro">
                <h1>Registro</h1>
                <p>Realize o seu cadastro para acessar nossa plataforma</p>
            </div>
            <div className="area-caixa-formulario-r">
                <div className="campo-formulario-r">
                    <input type="text" placeholder="Nome completo" id="campo-email-r"/>
                </div>
                <div className="campo-formulario-r">
                    <input type="text" placeholder="Email" />
                </div>
                <div className="campo-formulario-r">
                    <input type="password" placeholder="Senha" />
                </div>
                <div className="campo-formulario-r">
                    <input type="password" placeholder="Confirmar senha" />
                </div>
                <button>Criar</button>
                <p>
                    <Link to='/'>Voltar para login</Link>
                </p>
            </div>
        </div>
    )
}

export default Registro;