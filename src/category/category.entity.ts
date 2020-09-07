import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {type} from "os";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date
}