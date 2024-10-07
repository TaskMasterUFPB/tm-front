import { jwtDecode } from "jwt-decode"

export type Usuario = {
    id: string,
    email: string,
    cargo: string
}

class UsuarioServico {

    getToken(): string | null {
        try {
            return localStorage.getItem("userJwt")
        }
        catch (err) {
            console.log(err)
            return null
        }
    }

    setToken(token: string) {
        localStorage.setItem("userJwt", token)
    }

    getUsuario(): Usuario | undefined {

        const token = this.getToken()

        return token ? jwtDecode<Usuario>(token) : undefined;

    }

    isAuthenticated(): boolean {
        const usuario: Usuario | undefined = this.getUsuario();
        return usuario ? usuario.cargo != undefined : false
    }

    logout() {
        localStorage.removeItem("userJwt")
    }

}

export default new UsuarioServico();