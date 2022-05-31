import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    })
    isCanceled: boolean;
    /* @ManyToOne(type => Account, account  => account.debitMoneyTransactions)
    debitedAccount: Account; */

    /* @ManyToOne(type => Account, account  => account.creditMoneyTransactions)
    creditedAccount: Account; */
}
