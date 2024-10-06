import { UserRegistroProps } from "../types/UserRegistro";
import { api } from "./axios";

async function login(email: string, senha: string) {
    return await api.post('/usuario/login', {
        email,
        senha
    })
}

async function registrar(usuario: UserRegistroProps) {
    return await api.post('/usuario/registrar', {
        ...usuario
    })
}

export const usuarioApi = {
    login,
    registrar
}