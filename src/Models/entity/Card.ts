import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {User} from "./User";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardName: string;

    @Column()
    content: string;

    @ManyToMany(type => User, user => user.tasks)
    users: User[];
    // @Column()
    // email: string;
    //
    // @Column()
    // password: string;
}
