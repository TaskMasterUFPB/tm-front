import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Projeto.css';
import { projetoApi } from "../../server/projeto";
import { ProjetoProps } from "../../types/Projeto";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../types/Jwt";

const Projeto = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [projetos, setProjetos] = useState<ProjetoProps[]>([]);
    const [id, setId] = useState("");

    let maxRows = 6;
    let emptyRows = maxRows - projetos.length;

    // Lista de projetos simulada (pode vir de uma API)
    async function listarProjetos(id: string) {
        try {
            const resposta = await projetoApi.listaProjetos(id);
            setProjetos(resposta.data)
        } catch (error) {
            alert("Erro ao listar projetos")
        }
    }

    async function listarProjetosParticipantes(id: string) {
        try {
            const resposta = await projetoApi.listaProjetosParticipante(id);
            setProjetos(prevProjetos => prevProjetos.concat(resposta.data))
        } catch (error) {
            alert("Erro ao listar projetos")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("userJwt");
        if (token) {
            const decode: DecodedToken = jwtDecode(token)
            setId(decode.id)
            listarProjetos(decode.id);
            listarProjetosParticipantes(decode.id);
        }
    }, [id])

    return (
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
                        {projetos.filter(project =>
                            project.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.lider.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map(project => (
                            <tr key={project.id}>
                                <td>{project.nome}</td>
                                <td>{project.descricao}</td>
                                <td>{project.lider}</td>
                                <td><a href={`${project.url}`} target="_blank" rel="noopener noreferrer">{project.url}</a></td>
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