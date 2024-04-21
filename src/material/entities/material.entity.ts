import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nome: string
    @Column()
    disponivel: boolean
    @Column()
    cor: string
    @Column()
    preco: number
    @Column()
    densidade: number
}