import { api } from "./axios";

async function listaProjetos(id: string) {
    return await api.get(`/projeto/listarProjetos/${id}`)
}

export const projetoApi = {
    listaProjetos
}