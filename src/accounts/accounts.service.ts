import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moneytransaction } from 'src/moneytransactions/entities/moneytransaction.entity';
import { In, Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
    @InjectRepository(Moneytransaction)
    private moneytransactionsRepository: Repository<Moneytransaction>,
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
          'debitMoneytransactions.debitedAccount',
          'debitMoneytransactions.creditedAccount',
          'creditMoneytransactions',
          'creditMoneytransactions.debitedAccount',
          'creditMoneytransactions.creditedAccount',
        ],
      });
      return account;
    } catch (err) {
      //handle error
      throw err;
    }
  }

  async findAll(req): Promise<Account[]> {
    return await this.accountsRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect(
        'account.debitMoneytransactions',
        'debitMoneytransactions',
      )
      .leftJoinAndSelect(
        'account.creditMoneytransactions',
        'creditMoneytransactions',
      )
      .where('account.user.id = :id', { id: req.user.id })
      .getMany();
  }

  async calculateAccountBalance(account: Account) {
    let debitArray = [];
    let creditArray = [];

    const filteredCreditTransactionsArray =
      account.creditMoneytransactions.filter(
        (transaction) => transaction.isCanceled === false,
      );
    const filteredDebitTransactionsArray =
      account.debitMoneytransactions.filter(
        (transaction) => transaction.isCanceled === false,
      );

    for (let creditTransaction of filteredCreditTransactionsArray) {
      const parsedCreditAmount = parseFloat(creditTransaction.amount);
      creditArray.push(parsedCreditAmount);
    }

    for (let debitTransaction of filteredDebitTransactionsArray) {
      const parsedDebitAmount = parseFloat(debitTransaction.amount);
      debitArray.push(parsedDebitAmount);
    }

    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;

    let debitSum: number;
    let creditSum: number;
    if (debitArray.length === 0) {
      debitSum = 0;
    } else {
      debitSum = debitArray.reduce(reducer);
    }
    if (creditArray.length === 0) {
      creditSum = 0;
    } else {
      creditSum = creditArray.reduce(reducer);
    }

    const balance = creditSum - debitSum;

    return balance;
  }

  async blockAccount(req, id: string, updateAccountDto): Promise<Account> {
    const blockDate = new Date(updateAccountDto.blockDate);
    const delay = Date.now() - blockDate.getTime();
    if (delay > 259200000) {
      throw new UnauthorizedException();
    }

    const account: Account = await this.getOneById(id);
    if (account.user.id !== req.user.id) {
      throw new UnauthorizedException();
    }

    const updatedAccount = { ...account, isBlocked: true };

    const transactionsArray = account.creditMoneytransactions.concat(
      account.debitMoneytransactions,
    );

    let transactionsIdArray: number[] = [];

    for (let transaction of transactionsArray) {
      const transactionTimeStamp = new Date(transaction.createdAt);
      const transactionAge = Date.now() - transactionTimeStamp.getTime();

      if (transactionTimeStamp >= blockDate) {
        transactionsIdArray.push(transaction.id);
      }
    }

    await this.moneytransactionsRepository.update(
      { id: In(transactionsIdArray) },
      { isCanceled: true },
    );

    return await this.accountsRepository.save(updatedAccount);
  }
}
