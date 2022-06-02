import { Account } from "src/accounts/entities/account.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Moneytransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid")
    orderer: string;

    @Column("uuid")
    debitedAccount: string;

    @Column("uuid")
    creditedAccount: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: string;

    @Column('timestamp')
    createdAt: string;

    @Column({
        type: "boolean",
        default: false
    })
    isCanceled: boolean;

    /* @ManyToOne(type => Account, account  => account.debitMoneytransactions)
    @JoinColumn()
    debitedAccount: Account;

    @ManyToOne(type => Account, account  => account.creditMoneytransactions)
    @JoinColumn()
    creditedAccount: Account; */
}
