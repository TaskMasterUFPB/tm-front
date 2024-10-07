import { Link, useNavigate } from "react-router-dom";
import { CriarProjetoProps } from "../../types/CriarProjeto";
import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import './Projeto.css';

const Projeto = () => {
    const [projeto, setProjeto] = useState<CriarProjetoProps>({
        nome:'',
        descricao:'',
        lider: '',
        url:'',
        dataInicio: new Date(Date.now()),
        deletado: false
    });

    // Função para lidar com a mudança dos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjeto({
            ...projeto,
            [e.target.name]: e.target.value,
        });
    };

    // Função para salvar o projeto
    const handleSubmit = () => {
        if (projeto.nome && projeto.descricao && projeto.lider && projeto.url) {
            const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
            const updatedProjects = [...storedProjects, projeto];
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            alert('Projeto cadastrado com sucesso');
            setShowModal(false); // Fechar o modal após a submissão
            loadProjectsFromLocalStorage(); // Atualizar a lista de projetos na página
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    };

    const [projects, setProjects] = useState<CriarProjetoProps[]>([]); // Estado para armazenar os projetos
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    let maxRows = 6;

    // Função para carregar os projetos do localStorage
    const loadProjectsFromLocalStorage = () => {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        setProjects(storedProjects); // Atualizar o estado com os projetos armazenados
    };

    useEffect(() => {
        loadProjectsFromLocalStorage();
    }, []);

    // Apagar um objeto
    const deleteProject = (projectName: string) => {
        // Recuperar os projetos existentes no localStorage
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
        // Filtrar o projeto a ser removido com base no nome
        const updatedProjects = storedProjects.filter((project: CriarProjetoProps) => project.nome !== projectName);
    
        // Atualizar o localStorage com a nova lista de projetos
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
        // Atualizar o estado para refletir a mudança na UI
        setProjects(updatedProjects);
    
        alert('Projeto removido com sucesso!');
    };

    let emptyRows = maxRows - projects.length;

    // Função para abrir o modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                    {projects.filter(project =>
                            project.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.descricao.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((project, index) => (
                            <tr key={index}>
                                <td>{project.nome}</td>
                                <td>{project.descricao}</td>
                                <td>{project.lider}</td>
                                <td><a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></td>
                                {/* <td>{new Date(project.dataInicio).toLocaleDateString()}</td> */}
                                <td>
                                    ...
                                </td>
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
                        </div>
                        <div className="coluna-direita">
                            <label>Cargos</label>
                            <input
                                type="text"
                                placeholder="Dev, Analista, QA, etc"
                            />
                            <div className="input-container">
                                <div className="tag">Dev <span className="close-tag">x</span></div>
                            </div>
                            

                            <div className="area-btns">

                                <Button 
                                    label="Cancelar"
                                    onClick={handleCloseModal}
                                    width="150px"
                                />
                                <Button
                                    label="Criar"
                                    onClick={handleSubmit}
                                    width="150px"
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