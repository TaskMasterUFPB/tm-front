import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Projeto.css';
import { projetoApi } from "../../server/projeto";
import { ProjetoProps } from "../../types/Projeto";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../types/Jwt";
import Button from "../../components/button/Button";
import { Header } from "../../components/header";

const Projeto = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [projetos, setProjetos] = useState<ProjetoProps[]>([]);
    const [id, setId] = useState("");

    const [showModal, setShowModal] = useState(false);
    let maxRows = 6;
    let emptyRows = maxRows - projetos.length;

    // Função para lidar com a mudança dos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjetos({
            ...projetos,
            [e.target.name]: e.target.value,
        });
    };

    // Função para salvar o projeto
    const handleSubmit = () => {

    };

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

    // Função para abrir o modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="area-projeto">
            <Header />
            <div className="texto-projeto">
                <h1>Meus projetos</h1>
                <p>Seja bem-vindo a lista com todos os projetos que você está envolvido</p>
            </div>

            <div className="area-pesquisa-e-botao">
                <input
                    type="text"
                    placeholder="Buscar por projeto"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button id="btn-criar-projeto" onClick={handleOpenModal}>Criar projeto</button>
            </div>

            <div className="caixa-projetos">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
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

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="coluna-esquerda">
                            <label>Nome</label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Digite o nome do projeto"
                                onChange={handleChange}
                            />

                            <label>Descrição</label>
                            <input
                                type="text"
                                placeholder="Digite a descrição do projeto"
                                name="descricao"
                                onChange={handleChange}
                            />

                            <label>Líder</label>
                            <input
                                type="text"
                                placeholder="Digite o nome do líder do projeto"
                                name="lider"
                                onChange={handleChange}
                            />

                            <label>URL</label>
                            <input
                                type="text"
                                name="url"
                                onChange={handleChange}
                                placeholder="Digite a URL do projeto"
                            />
                        </div>
                        <div className="coluna-central">
                            <label>Adicionar participantes</label>
                            <input
                                type="text"
                                placeholder="E-mails dos indivíduos"
                            />

                            <div className="input-container">
                                <div className="tag">Gustavo <span className="close-tag">x</span></div>
                            </div>

                            <Button
                                label="Adicionar participantes"
                                width="98%"
                            />
                        </div>
                        <div className="coluna-direita">
                            <div className="dados-coluna">
                                <label>Cargos</label>
                                <input
                                    type="text"
                                    placeholder="Dev, Analista, QA, etc"
                                />
                                <div className="input-container">
                                    <div className="tag">Dev <span className="close-tag">x</span></div>
                                </div>

                                <Button
                                    label="Adicionar cargo"
                                    width="98%"
                                />
                            </div>

                            <div className="area-btns">

                                <Button
                                    label="Cancelar"
                                    onClick={handleCloseModal}
                                    width="10rem"
                                    backgroundColor="white"
                                    color="#0886E1"
                                    border="1px solid #0886E1"
                                />
                                <Button
                                    label="Criar"
                                    onClick={handleSubmit}
                                    width="10rem"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Projeto;