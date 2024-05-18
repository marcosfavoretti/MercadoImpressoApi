import { Usuario } from "src/_framework/ORM/Model/Usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produto_personalizado {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    area_superficie: number

    @Column()
    volume: number

    @Column()
    modelo3d: string

    @ManyToOne(() => Usuario, usuario => usuario.id)
    @JoinColumn({ name: "userId" })
    UserId: Usuario
}