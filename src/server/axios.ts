import axios from "axios";
import usuarioServico from "./usuarioServico";

const apiUrl = import.meta.env.VITE_API_URL

const userToken = usuarioServico.getToken() ?? ''

export const api = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
    },
})