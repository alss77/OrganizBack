import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, ObjectType } from 'typeorm';
import {User} from './User';
import {Task} from './Card';

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((): ObjectType<User> => User, user => user.tasks, { cascade: true })
    users: User[];

    @OneToMany((): ObjectType<Task> => Task, task => task.team, { cascade: true })
    task: Task[];
}
