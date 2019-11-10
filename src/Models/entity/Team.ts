import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import {User} from './User';
import {Task} from './Card';

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => User, user => user.tasks, { cascade: true })
    users: User[];

    @OneToMany(type => Task, task => task.team, { cascade: true })
    task: Task[];
}
