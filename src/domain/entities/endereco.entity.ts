import { Usuario } from "./usuario.entity"

export class Endereco {
    userId: Usuario
    rua: string
    bairro: string
    numero: number
}