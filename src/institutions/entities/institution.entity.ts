import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Institution {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
    })
    firstName: string;

    @Column("varchar")
    password: string;

}
