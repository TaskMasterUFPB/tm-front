import React, { useEffect, useState } from "react";
import './Projeto.css';
import { projetoApi } from "../../server/projeto";
import { NovoProjeto, ProjetoProps } from "../../types/Projeto";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../types/Jwt";
import Button from "../../components/button/Button";

const Projeto = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [projetos, setProjetos] = useState<ProjetoProps[]>([]);
    const [novoProjeto, setNovoProjeto] = useState<NovoProjeto>({
        nome: "",
        descricao: "",
        url: "",
        id_criador: "",
        email_lider: "",
        emailParticipantes: []
    });
    const [id, setId] = useState("");
    const [showModal, setShowModal] = useState(false);
    let maxRows = 6;
    let emptyRows = maxRows - projetos.length;

    // Função para lidar com a mudança dos campos do formulário
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        if (name === "emailParticipantes") {
            const participantes = value.split(",").map(email => email.trim()); // Separa e remove espaços
            setNovoProjeto(prevProjeto => ({
                ...prevProjeto,
                emailParticipantes: participantes
            }))
        } else {
            setNovoProjeto({
                ...novoProjeto,
                [e.target.name]: e.target.value,
            });
        }
    }

    console.log(novoProjeto)

    // Função para salvar o projeto
    async function handleSubmit() {
        try {
            const resposta = await projetoApi.criarProjeto({
                nome: novoProjeto.nome,
                descricao: novoProjeto.descricao,
                url: novoProjeto.url,
                id_criador: id,
                email_lider: novoProjeto.email_lider,
                emailParticipantes: novoProjeto.emailParticipantes,
            })
            if (resposta.status === 201) {
                alert('Projeto criado com sucesso!')
                handleCloseModal()
                resetaForm()
            }
        } catch (error) {
            alert('Erro ao criar projeto!')
            resetaForm()
        }
    }

    async function listarProjetosParticipantes(id: string) {
        try {
            const resposta = await projetoApi.listaProjetosParticipante(id);
            const todosProjetos = Object.values(resposta.data).flat() as ProjetoProps[];
            setProjetos(todosProjetos)
        } catch (error) {
            alert("Erro ao listar projetos")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("userJwt");
        if (token) {
            const decode: DecodedToken = jwtDecode(token)
            setId(decode.id)
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
        resetaForm()
    };

    function resetaForm() {
        setNovoProjeto({
            nome: "",
            descricao: "",
            url: "",
            id_criador: "",
            participantes_id: [],
            email_lider: "",
            emailParticipantes: []
        })
    }

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
                                <td>{project.email_lider}</td>
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
                                value={novoProjeto.nome}
                                placeholder="Digite o nome do projeto"
                                onChange={handleChange}
                            />

                            <label>Descrição</label>
                            <input
                                type="text"
                                placeholder="Digite a descrição do projeto"
                                name="descricao"
                                value={novoProjeto.descricao}
                                onChange={handleChange}
                            />

                            <label>Líder</label>
                            <input
                                type="text"
                                placeholder="Digite o email do líder do projeto"
                                name="email_lider"
                                value={novoProjeto.email_lider}
                                onChange={handleChange}
                            />

                            <label>URL</label>
                            <input
                                type="text"
                                name="url"
                                value={novoProjeto.url}
                                onChange={handleChange}
                                placeholder="Digite a URL do projeto"
                            />
                        </div>
                        <div className="coluna-central">

                            <label>Adicionar participantes</label>
                            <input
                                type="text"
                                name="emailParticipantes"
                                value={novoProjeto.emailParticipantes}
                                onChange={handleChange}
                                placeholder="E-mails dos indivíduos"
                            />


                            <label>Cargos</label>
                            <input
                                type="text"
                                placeholder="Dev, Analista, QA, etc"
                            />

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