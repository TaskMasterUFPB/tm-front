import './Task.css';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import React, { useState } from 'react';
import { ColunaProps } from '../../types/Coluna';
import { Header } from '../../components/header';
import Button from '../../components/button/Button';
import UserCircles from './userCircle';

const Task: React.FC = () => {
    const [coluna, setColuna] = useState<ColunaProps[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [tipoVisualizacao, setTipoVisualizacao] = useState('quadro');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColuna({
            ...coluna,
            [e.target.name]: e.target.value,
        });
    };

    // Função para abrir o modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    function alteraTipoVisualizacao(tipo: string) {
        if (tipo === 'quadro') {
            setTipoVisualizacao('quadro');
        } else {
            setTipoVisualizacao('lista');
        }
    }

    console.log(tipoVisualizacao)

    return (
        <div className="area-task">
            <Header />
            <div className='nome-e-bnt-add'>
                <h1>Projeto E-commerce</h1>
                <div className='bnt-add-e-circles'>
                    <UserCircles />
                    <button className='button-add-pessoas'>
                        <PersonAddOutlinedIcon />Adicionar pessoas
                    </button>
                </div>
            </div>
            <div className='quadro-pesquisar-e-add-coluna'>
                <ul>
                    <li >
                        <button className={tipoVisualizacao === 'quadro' ? 'tipoQuadro' : ''} onClick={() => alteraTipoVisualizacao('quadro')}>
                            <TableChartOutlinedIcon />Quadro
                        </button>
                    </li>
                    <li>
                        <button className={tipoVisualizacao === 'lista' ? 'tipoLista' : ''} onClick={() => alteraTipoVisualizacao('lista')}>
                            <FormatListBulletedOutlinedIcon />Lista
                        </button>
                    </li>
                </ul>
                <h4>
                </h4>
                <div className='pesquisar-e-add-coluna'>
                    <input
                        type="text"
                        placeholder="Buscar..."
                    />
                    <Button height='3rem' label='Nova Coluna' onClick={handleOpenModal} />
                </div>
            </div>
            <div className='caixa-tasks'>

            </div>

            {/* Model */}
            {showModal && (
                <div className='modal-t'>
                    <div className='modal-content-t'>
                        <h2>Adicionar nova coluna</h2>
                        <hr className="modal-divider" />
                        <input
                            type="text"
                            placeholder='Nome da nova coluna'
                            className="modal-input"
                        />
                        <div className="modal-buttons">
                            <button className="btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                            <button className="btn-create">Criar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Task;