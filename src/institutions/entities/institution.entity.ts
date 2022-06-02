import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Institution {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
    })
    name: string;

    @Column("varchar")
    privateKey: string;

}
