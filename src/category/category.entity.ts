import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Exclude()
    @CreateDateColumn({type: 'timestamp'})
    created_at: Date

    @Expose()
    get info(): string {
        return `id: ${this.id}, name: ${this.name}, created: ${this.created_at.toDateString()}`;
    }
}