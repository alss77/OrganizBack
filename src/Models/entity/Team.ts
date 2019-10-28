import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import {User} from "./User";
import {Task} from "./Card";

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => User, user => user.tasks)
    users: User;

    @OneToMany(type => Task, task => task.team)
    task: Task;

    // @Column()
    // email: string;
    //
    // @Column()
    // password: string;
}
