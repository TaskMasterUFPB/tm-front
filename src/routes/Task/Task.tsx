import './Task.css';
import UserCircles from './userCircle';
import { RxExit } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import React, { useState } from 'react';
import { ColunaProps } from '../../types/Coluna';

const Task: React.FC = () => {
    const [coluna, setColuna] = useState<ColunaProps[]>([]);
    const [showModal, setShowModal] = useState(false);

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

    return(
        <div className="area-task">
            <nav className="barra-de-pesquisa-t">
                <h1>Logo</h1>
                <div className="area-btn-t">
                    <button className="configuracao-t" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IoSettingsOutline />Configurações
                    </button>
                    <button className="sair-t" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <RxExit />Sair
                    </button>
                </div>
            </nav>
            <div className='nome-e-bnt-add'>
                <h1>Projeto E-commerce</h1>
                <div className='bnt-add-e-circles'>
                    <UserCircles/>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IoPersonAddOutline color='#1890ff'/>Adicionar pessoas
                    </button>
                </div>
            </div>
            <div className='quadro-pesquisar-e-add-coluna'>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MdOutlineSpaceDashboard />Quadro
                </h4>
                <div className='pesquisar-e-add-coluna'>
                    <input
                        type="text"
                        placeholder="Buscar..."
                    />
                    <button onClick={handleOpenModal}>
                        Nova Coluna
                    </button>
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