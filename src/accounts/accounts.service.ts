import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinColumn, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  async createAccount(req): Promise<Account> {
    const newAccount = await this.accountsRepository.create({
      user: req.user.id,
    });

    return this.accountsRepository.save(newAccount);
  }

  async getOneById(id: string): Promise<Account> {
    try {
      const account = await this.accountsRepository.findOneOrFail(id, {
        relations: [
          'user',
          'debitMoneytransactions',
          'creditMoneytransactions',
        ],
      });
      return account;
    } catch (err) {
      //handle error
      throw err;
    }
  }

  findAll(req): Promise<Account[]> {
    return this.accountsRepository.find({ where: { user: req.user.id } });
  }

  async calculateAccountBalance(account: Account) {
    /* const account = await this.accountsRepository.findOneOrFail(id, {
      relations: ['debitMoneytransactions', 'creditMoneytransactions'],
    }); */

    //console.log(account.creditMoneytransactions)

    const debitArray: number[] = [];
    const creditArray: number[] = [];

    for (let transaction of account.debitMoneytransactions) {
      const transactionIndex =
        account.debitMoneytransactions.indexOf(transaction);

      if (transaction.isCanceled === true) {
        account.debitMoneytransactions.splice(transactionIndex, 1);
      }

      //console.log(parseFloat(trans).toFixed(2))
      const parsedAmout = parseFloat(transaction.amount);
      debitArray.push(parsedAmout);
    }

    for (let transaction of account.creditMoneytransactions) {
      const transactionIndex =
        account.creditMoneytransactions.indexOf(transaction);

      if (transaction.isCanceled === true) {
        account.creditMoneytransactions.splice(transactionIndex, 1);
      }

      //console.log(parseFloat(trans).toFixed(2))
      const parsedAmout = parseFloat(transaction.amount);
      creditArray.push(parsedAmout);
    }
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    const debitsSum = debitArray.reduce(reducer);
    const creditSum = creditArray.reduce(reducer);
    //console.log(debitsSum);
    const balance = creditSum - debitsSum;

    return balance;
  }
}

/* create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  } */
