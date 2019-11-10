import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany, ObjectType, JoinTable } from 'typeorm';
import {Task} from './Card';
import { Team } from './Team';

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

    @ManyToMany(
      (): ObjectType<Task> => Task,
      task => task.users,
      {nullable: true})
    @JoinTable()
    tasks: Task[];

    @ManyToMany(
      (): ObjectType<Team> => Team,
      team => team.users,
      {nullable: true})
    @JoinTable()
    teams: Team[];
}
