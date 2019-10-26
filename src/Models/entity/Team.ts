import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import {User} from "./User";
import {Task} from "./Card";

@Entity()
export class Team {

    @Column()
    TeamId: number;

    @ManyToMany(type => User, user => user.tasks)
    users: User[];

    @ManyToMany(type => User, user => user.tasks)
    task: Task[];

    // @Column()
    // email: string;
    //
    // @Column()
    // password: string;
}
