import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MailEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    isConfirmed: boolean;

    @Column()
    emailToken: string;

    @Column()
    location: string;
}