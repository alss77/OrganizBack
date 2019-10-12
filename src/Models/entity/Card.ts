import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Card {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardName: string;

    @Column()
    content: string;

    // @Column()
    // email: string;
    //
    // @Column()
    // password: string;
}
