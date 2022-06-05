import { Account } from 'src/accounts/entities/account.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Moneytransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  orderer: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isCanceled: boolean;

  @ManyToOne((type) => Account, (account) => account.debitMoneytransactions)
  debitedAccount: Account;

  @ManyToOne((type) => Account, (account) => account.creditMoneytransactions)
  creditedAccount: Account;
}
