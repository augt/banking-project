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

  async findAll(req): Promise<Account[]> {
    return await this.accountsRepository.createQueryBuilder("account").leftJoinAndSelect("account.debitMoneytransactions","debitMoneytransactions").leftJoinAndSelect("account.creditMoneytransactions","creditMoneytransactions").where("account.user.id = :id", {id:req.user.id}).getMany();

  }

  async calculateAccountBalance(account: Account) {

    const debitArray: number[] = [];
    const creditArray: number[] = [];

    for (let transaction of account.debitMoneytransactions) {
      const transactionIndex =
        account.debitMoneytransactions.indexOf(transaction);

      if (transaction.isCanceled === true) {
        account.debitMoneytransactions.splice(transactionIndex, 1);
      }
      const parsedAmout = parseFloat(transaction.amount);
      debitArray.push(parsedAmout);
    }

    for (let transaction of account.creditMoneytransactions) {
      const transactionIndex =
        account.creditMoneytransactions.indexOf(transaction);

      if (transaction.isCanceled === true) {
        account.creditMoneytransactions.splice(transactionIndex, 1);
      }

      const parsedAmout = parseFloat(transaction.amount);
      creditArray.push(parsedAmout);
    }
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;

    let debitSum:number;
    let creditSum:number;
    if (debitArray.length===0){
      debitSum= 0;
    } else{
      debitSum = debitArray.reduce(reducer);
    }
    if (creditArray.length===0){
      creditSum= 0;
    } else{
      creditSum = creditArray.reduce(reducer);
    }

    const balance = creditSum - debitSum;

    return balance;
  }
}