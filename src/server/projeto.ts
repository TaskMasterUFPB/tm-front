import { NovoProjeto } from "../types/Projeto";
import { api } from "./axios";

async function listaProjetos(id: string) {
    return await api.get(`/projeto/listarProjetos/${id}`)
}

async function listaProjetosParticipante(id: string) {
    return await api.get(`/projeto/listarProjetosPorParticipante/${id}`)
}

async function criarProjeto(data: NovoProjeto){
    return await api.post('/projeto/criarProjeto', data)
}

export const projetoApi = {
    listaProjetos,
    listaProjetosParticipante,
    criarProjeto
}