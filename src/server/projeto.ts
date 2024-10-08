import { api } from "./axios";

async function listaProjetos(id: string) {
    return await api.get(`/projeto/listarProjetos/${id}`)
}

async function listaProjetosParticipante(id: string) {
    return await api.get(`/projeto/listarProjetosPorParticipante/${id}`)
}

export const projetoApi = {
    listaProjetos,
    listaProjetosParticipante
}