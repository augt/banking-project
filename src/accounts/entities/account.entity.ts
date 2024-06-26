import { Moneytransaction } from 'src/moneytransactions/entities/moneytransaction.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBlocked: boolean;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(
    () => Moneytransaction,
    (transaction) => transaction.debitedAccount,
  )
  debitMoneytransactions: Moneytransaction[];

  @OneToMany(
    () => Moneytransaction,
    (transaction) => transaction.creditedAccount,
  )
  creditMoneytransactions: Moneytransaction[];
}
