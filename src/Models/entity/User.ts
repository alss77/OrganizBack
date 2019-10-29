import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany} from 'typeorm';
import {Task} from './Card';

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(type => Task, task => task.users)
    tasks: Task[];
}
