import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
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

    @ManyToMany(type => User, user => user.tasks, { cascade: true })
    users: User[];

    @ManyToOne(type => Team, team => team.task, { cascade: true })
    team: Team;
    // @Column()
    // email: string;
    //
    // @Column()
    // password: string;
}
