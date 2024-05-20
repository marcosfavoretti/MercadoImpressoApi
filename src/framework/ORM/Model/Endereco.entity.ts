import { Usuario } from "src/framework/ORM/Model/Usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Usuario, usuario => usuario.id)
    @JoinColumn({ name: "userId" })
    userId: Usuario
    @Column()
    rua: string
    @Column()
    bairro: string
    @Column()
    numero: number
}