import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, ObjectType } from 'typeorm';
import {User} from './User';
import {Team} from './Team';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardName: string;

    @Column()
    content: string;

    @ManyToMany((): ObjectType<User> => User, user => user.tasks, { cascade: true })
    users: User[];

    @ManyToOne((): ObjectType<Team> => Team, team => team.task)
    team: Team;

}
