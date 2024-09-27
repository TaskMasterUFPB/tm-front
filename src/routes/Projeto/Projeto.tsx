import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Projeto.css';

const Projeto = () => {

    const [searchTerm, setSearchTerm] = useState("");
    let maxRows = 6;

    // Lista de projetos simulada (pode vir de uma API)
    const projects = [
        { name: "Pessoas Sociais", type: "Projeto Pessoal com Ideias Futuras", leader: "Gustavo Theotonio", url: "localhost:3030" },
        { name: "E-commerce", type: "Projeto Freelancer com Ix", leader: "João Alberto", url: "www.ecommercejr.com" },
    ];

    let emptyRows = maxRows - projects.length;

    return(
        <div className="area-projeto">
            <nav className="barra-de-pesquisa">
                <h1>Logo</h1>
                <div className="area-btn">
                    <button className="configuracao">Configurações</button>
                    <button className="sair">Sair</button>
                </div>
            </nav>

            <div className="texto-projeto">
                <h1>Meus projetos</h1>
                <p>Seja bem-vindo a lista com todos os projetos que você está envolvido</p>
            </div>

            <div className="area-pesquisa-e-botao">
                <input type="text" placeholder="Buscar por projeto" />
                <button id="btn-criar-projeto">Criar projeto</button>
            </div>

            <div className="caixa-projetos">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Líder</th>
                            <th>URL</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                    {projects.filter(project =>
                            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.leader.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map(project => (
                            <tr key={project.name}>
                                <td>{project.name}</td>
                                <td>{project.type}</td>
                                <td>{project.leader}</td>
                                <td><a href={`http://${project.url}`} target="_blank" rel="noopener noreferrer">{project.url}</a></td>
                                <td>...</td>
                            </tr>
                        ))}
                        {[...Array(emptyRows > 0 ? emptyRows : 0)].map((_, index) => (
                            <tr key={index}>
                                <td className="espaco-vazio">&nbsp;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Projeto;