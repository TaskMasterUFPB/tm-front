export type CriarProjetoProps = {
    nome: string,
    descricao: string,
    id_criador?: string,
    lider: string,
    participantes?: [string],   // Devo alterar de lista de String para lista de User
    url: string,
    dataInicio: Date,
    deletado: boolean,
    Tarefas?: [string]
}