export interface ProjetoProps {
    id: string,
    nome: string,
    descricao: string,
    url: string,
    lider: string,
    email_lider: string
    emailParticipantes: string[]
}

export interface NovoProjeto {
    nome: string,
    descricao: string,
    url: string,
    id_criador: string
    participantes_id?: string[]
    email_lider: string,
    emailParticipantes: string[]
}